import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from './authMiddleware'
import logger from '@/server/utils/logger' // Assuming a logger utility exists

export interface TransactionRequest extends AuthRequest {
	body: { amount: number }
}

export const transactionsMiddleware = (req: TransactionRequest, res: Response, next: NextFunction): void => {
	const { amount } = req.body

	logger.info(`Transaction amount received: ${amount}`)

	// Check if amount is provided
	if (typeof amount !== 'number') {
		logger.error('Invalid transaction amount type')
		res.status(400).json({ message: `Invalid amount type: ${amount}` })
		return
	}

	// Check if amount is a positive number
	if (!amount || amount <= 0) {
		logger.error(`Invalid transaction amount: ${amount}`)
		res.status(400).json({ message: 'Invalid amount' })
		return
	}

	next()
}
