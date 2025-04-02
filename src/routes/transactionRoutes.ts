import { authMiddleware } from '@/middlewares/authMiddleware'
import { TransactionRequest, transactionsMiddleware } from '@/middlewares/transactionsMiddleware'
import { Response, Router } from 'express'
// import { createTransactionEvent } from '@/services/transactionService'

const router = Router()

// Secure deposit and withdrawal
router.post(
	['/deposit', '/withdrawal'],
	authMiddleware,
	transactionsMiddleware,
	async (req: TransactionRequest, res: Response) => {
		// await createTransactionEvent(userId, amount, req.params.type as 'deposit' | 'withdrawal')
		res.json({ message: 'Transaction initiated' })
	}
)

export default router
