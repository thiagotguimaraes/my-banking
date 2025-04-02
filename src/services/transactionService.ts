import AppDataSource from '@/config/database'
import { Transaction } from '@/models/Transaction'
import { User } from '@/models/User'

export const deposit = async (userId: string, amount: number) => {
	const transactionRepo = AppDataSource.getRepository(Transaction)
	if (amount <= 0) throw new Error('Invalid deposit amount')

	const transaction = transactionRepo.create({ user: { id: userId }, amount, type: 'deposit', status: 'pending' })
	await transactionRepo.save(transaction)

	// TODO: Integrate Kafka for transaction confirmation

	transaction.status = 'completed'
	await transactionRepo.save(transaction)
	return transaction
}

export const withdraw = async (userId: string, amount: number) => {
	if (amount <= 0) throw new Error('Invalid withdrawal amount')

	const userRepo = AppDataSource.getRepository(User)
	const user = await userRepo.findOne({ where: { id: userId } })
	if (!user) throw new Error('User not found')

	const transactionRepo = AppDataSource.getRepository(Transaction)
	const transaction = transactionRepo.create({ user, amount, type: 'withdrawal', status: 'pending' })
	await transactionRepo.save(transaction)

	// TODO: Ensure sufficient balance before approving

	transaction.status = 'completed'
	await transactionRepo.save(transaction)
	return transaction
}
