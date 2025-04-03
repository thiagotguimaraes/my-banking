import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from './authMiddleware'

export interface TransactionRequest extends AuthRequest {
	body: { amount: number }
}

export const transactionsMiddleware = (req: TransactionRequest, res: Response, next: NextFunction): void => {
	const { amount } = req.body

	if (!amount || amount <= 0) {
		res.status(400).json({ message: 'Invalid amount' })
		return
	}

	next()
}
