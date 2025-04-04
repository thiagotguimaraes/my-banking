import { createTransactionEvent, getBalance, consumeTransactions } from '@/services/transactionService'
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

			AppDataSource.getRepository(Transaction).createQueryBuilder().getRawOne.mockResolvedValue(mockBalance)

			const balance = await getBalance(userId)

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

			AppDataSource.getRepository(Transaction).createQueryBuilder().getRawOne.mockResolvedValue(null)

			const balance = await getBalance(userId)

			expect(balance).toBe(0)
		})
	})

	describe('consumeTransactions', () => {
		it('should subscribe and run the Kafka consumer', async () => {
			await consumeTransactions()

			expect(kafka.consumer.subscribe).toHaveBeenCalledWith({
				topic: kafka.TopicsEnum.TRANSACTIONS,
				fromBeginning: true,
			})

			expect(kafka.consumer.run).toHaveBeenCalledWith({
				eachMessage: expect.any(Function),
			})
		})
	})
})
