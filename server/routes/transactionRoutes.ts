import { authMiddleware } from '@/middlewares/authMiddleware'
import { TransactionRequest, transactionsMiddleware } from '@/middlewares/transactionsMiddleware'
import { TransactionType } from '@/models/Transaction'
import { createTransactionEvent } from '@/services/transactionService'
import { Response, Router } from 'express'

const router = Router()

// Secure deposit and withdrawal
router.post(
	['/deposit', '/withdrawal'],
	authMiddleware,
	transactionsMiddleware,
	async (req: TransactionRequest, res: Response) => {
		const userId = req.user?.userId
		if (!userId) {
			res.status(400).json({ message: 'User ID is required' })
			return
		}
		const amount = req.body.amount
		const type = req.url.split('/')[1] as TransactionType

		await createTransactionEvent(userId, amount, type)

		res.json({ message: 'Transaction initiated' })
	}
)

export default router
