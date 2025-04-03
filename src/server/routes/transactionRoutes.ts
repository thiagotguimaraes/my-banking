import { authMiddleware } from '@/server/middlewares/authMiddleware'
import { TransactionRequest, transactionsMiddleware } from '@/server/middlewares/transactionsMiddleware'
import logger from '@/server/utils/logger'
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
		logger.info(`Transaction initiated: ${req.url} of ${req.body.amount} for userId ${req.user?.userId}`)

		res.json({ message: 'Transaction initiated' })
	}
)

export default router
