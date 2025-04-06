import {
	createTransactionEvent,
	getUserBalance,
	consumeTransactions,
	getTransactionsByUserAndDateRange,
} from '@/services/transactionService'
import kafka from '@/config/kafka'
import AppDataSource from '@/config/database'
import { Transaction, TransactionStatusEnum, TransactionTypeEnum } from '@/models/Transaction'

jest.mock('@/config/kafka', () => ({
	producer: {
		send: jest.fn(),
	},
	consumer: {
		subscribe: jest.fn(),
		run: jest.fn(),
	},
	TopicsEnum: {
		TRANSACTIONS: 'transactions',
	},
}))

jest.mock('@/config/database', () => ({
	getRepository: jest.fn().mockReturnValue({
		create: jest.fn(),
		save: jest.fn(),
		find: jest.fn(),
		createQueryBuilder: jest.fn().mockReturnValue({
			select: jest.fn().mockReturnThis(),
			where: jest.fn().mockReturnThis(),
			andWhere: jest.fn().mockReturnThis(),
			getRawOne: jest.fn(),
		}),
	}),
}))

describe('transactionService', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('createTransactionEvent', () => {
		it('should send a transaction event to Kafka', async () => {
			const userId = '123'
			const amount = 100
			const type = TransactionTypeEnum.DEPOSIT

			await createTransactionEvent(userId, amount, type)

			expect(kafka.producer.send).toHaveBeenCalledWith({
				topic: kafka.TopicsEnum.TRANSACTIONS,
				messages: [
					{
						key: userId,
						value: JSON.stringify({ userId, amount, type }),
					},
				],
			})
		})
	})

	describe('getBalance', () => {
		it('should return the user balance', async () => {
			const userId = '123'
			const mockBalance = { balance: 500 }

			AppDataSource.getRepository(Transaction).createQueryBuilder().getRawOne = jest
				.fn()
				.mockResolvedValue(mockBalance)

			const balance = await getUserBalance(userId)

			expect(balance).toBe(500)
			expect(AppDataSource.getRepository(Transaction).createQueryBuilder).toHaveBeenCalledWith('transaction')
			expect(AppDataSource.getRepository(Transaction).createQueryBuilder().select).toHaveBeenCalledWith(
				'SUM(transaction.amount)',
				'balance'
			)
			expect(AppDataSource.getRepository(Transaction).createQueryBuilder().where).toHaveBeenCalledWith(
				'transaction.userId = :userId',
				{ userId }
			)
			expect(AppDataSource.getRepository(Transaction).createQueryBuilder().andWhere).toHaveBeenCalledWith(
				"transaction.type = 'deposit'"
			)
		})

		it('should return 0 if no balance is found', async () => {
			const userId = '123'

			AppDataSource.getRepository(Transaction).createQueryBuilder().getRawOne = jest.fn().mockResolvedValue(null)

			const balance = await getUserBalance(userId)

			expect(balance).toBe(0)
		})
	})

	describe('consumeTransactions', () => {
		it('should subscribe and run the Kafka consumer', async () => {
			await consumeTransactions()

			expect(kafka.consumer.subscribe).toHaveBeenCalledWith({
				topic: kafka.TopicsEnum.TRANSACTIONS,
			})

			expect(kafka.consumer.run).toHaveBeenCalledWith({
				autoCommit: true,
				autoCommitInterval: 5000,
				eachMessage: expect.any(Function),
			})
		})
	})

	describe('getTransactionsByUserAndDateRange', () => {
		it('should return transactions for a user within a date range', async () => {
			const userId = '123'
			const startDate = new Date('2023-01-01')
			const endDate = new Date('2023-01-31')
			const mockTransactions = [
				{ id: 1, userId: 123, amount: 100, createdAt: new Date('2023-01-10') },
				{ id: 2, userId: 123, amount: 200, createdAt: new Date('2023-01-20') },
			]

			AppDataSource.getRepository(Transaction).find = jest.fn().mockResolvedValue(mockTransactions)

			const transactions = await getTransactionsByUserAndDateRange(userId, startDate, endDate)

			expect(transactions).toEqual(mockTransactions)
			expect(AppDataSource.getRepository(Transaction).find).toHaveBeenCalledWith({
				where: {
					userId: Number(userId),
					createdAt: expect.any(Object), // Between condition
				},
			})
		})

		it('should return an empty array if no transactions are found', async () => {
			const userId = '123'
			const startDate = new Date('2023-01-01')
			const endDate = new Date('2023-01-31')

			AppDataSource.getRepository(Transaction).find = jest.fn().mockResolvedValue([])

			const transactions = await getTransactionsByUserAndDateRange(userId, startDate, endDate)

			expect(transactions).toEqual([])
		})
	})
})
