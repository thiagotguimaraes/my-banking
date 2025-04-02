import { Request, Response, NextFunction } from 'express'

export interface TransactionRequest extends Request {
	body: { amount: number }
	user: { userId: number }
}

export const transactionsMiddleware = (req: TransactionRequest, res: Response, next: NextFunction) => {
	const { amount } = req.body

	if (!amount || amount <= 0) {
		return res.status(400).json({ message: 'Invalid amount' })
	}

	next()
}
