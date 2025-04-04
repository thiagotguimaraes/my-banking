import AppDataSource from '@/config/database'
import kafka from '@/config/kafka'
import { Transaction, TransactionStatusEnum, TransactionType, TransactionTypeEnum } from '@/models/Transaction'
import logger from '@/utils/logger'

const transactionRepo = AppDataSource.getRepository(Transaction)

export const createTransactionEvent = async (userId: string, amount: number, type: TransactionType) => {
	logger.info(`Transaction initiated: ${type} of $${amount} for userId ${userId}`)

	await kafka.producer.send({
		topic: kafka.TopicsEnum.TRANSACTIONS,
		messages: [{ key: userId.toString(), value: JSON.stringify({ userId, amount, type }) }],
	})
}

const processTransaction = async (message: any) => {
	logger.info(`Processing transaction: ${message.value.toString()}`)

	const { userId, amount, type } = JSON.parse(message.value.toString())

	const transaction = transactionRepo.create({ userId, amount, type, status: TransactionStatusEnum.PENDING })
	await transactionRepo.save(transaction)

	if (type === TransactionTypeEnum.WITHDRAWAL) {
		const balance = await getBalance(userId)

		if (balance < amount) {
			transaction.status = TransactionStatusEnum.FAILED
		} else {
			transaction.status = TransactionStatusEnum.COMPLETED
		}
	} else {
		transaction.status = TransactionStatusEnum.COMPLETED
	}

	const savedTransaction = await transactionRepo.save(transaction)
	logger.info(`Transaction processed: ${JSON.stringify(savedTransaction)}`)
}

export const consumeTransactions = async () => {
	await kafka.consumer.subscribe({ topic: kafka.TopicsEnum.TRANSACTIONS, fromBeginning: true })

	await kafka.consumer.run({
		eachMessage: async ({ message }) => {
			await processTransaction(message)
		},
	})
}

export const getBalance = async (userId: any): Promise<number> => {
	const result = await transactionRepo
		.createQueryBuilder('transaction')
		.select('SUM(transaction.amount)', 'balance')
		.where('transaction.userId = :userId', { userId })
		.andWhere("transaction.type = 'deposit'")
		.getRawOne()

	return result?.balance ?? 0
}
