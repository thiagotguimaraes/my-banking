import { authMiddleware } from '@/middlewares/authMiddleware'
import { TransactionRequest, transactionsMiddleware } from '@/middlewares/transactionsMiddleware'
import { TransactionType } from '@/models/Transaction'
import { createTransactionEvent, getTransactionsByUserAndDateRange } from '@/services/transactionService'
import logger from '@/utils/logger'
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

// Get transactions by user and date range
router.get('/all', authMiddleware, async (req: TransactionRequest, res: Response) => {
	const userId = req.user?.userId
	if (!userId) {
		res.status(400).json({ message: 'User ID is required' })
		return
	}

	const { startDate, endDate } = req.query
	if (!startDate || !endDate) {
		res.status(400).json({ message: 'Start date and end date are required' })
		return
	}

	try {
		const transactions = await getTransactionsByUserAndDateRange(
			userId,
			new Date(startDate as string),
			new Date(endDate as string)
		)
		res.json(transactions)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching transactions', error })
	}
})

export default router
