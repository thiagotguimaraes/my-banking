import { Router } from 'express'
import { authMiddleware, AuthRequest } from '@/middlewares/authMiddleware'
import { createTransactionEvent } from '@/services/transactionService'

const router = Router()

// Secure deposit and withdrawal
router.post('/:type(deposit|withdrawal)', authMiddleware, async (req: AuthRequest, res) => {
	const { amount } = req.body
	const { userId } = req.user!

	if (!amount || amount <= 0) {
		return res.status(400).json({ message: 'Invalid amount' })
	}

	await createTransactionEvent(userId, amount, req.params.type as 'deposit' | 'withdrawal')
	res.json({ message: 'Transaction initiated' })
})

export default router
