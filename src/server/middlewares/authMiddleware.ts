import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@/server/utils/jwtHelper'
import logger from '@/server/utils/logger'

export interface AuthRequest extends Request {
	user?: { userId: string; role: string }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
	logger.info(`Incoming request: ${req.method} ${req.url}`)

	const token = req.header('Authorization')?.split(' ')[1]

	if (!token) {
		logger.warn('Unauthorized access attempt: No token provided')
		res.status(401).json({ message: 'Unauthorized: No token provided' })
		return
	}

	const decoded = verifyToken(token)
	if (!decoded) {
		logger.warn('Unauthorized access attempt: Invalid token')
		res.status(401).json({ message: 'Unauthorized: Invalid token' })
		return
	}

	req.user = decoded as { userId: string; role: string }
	logger.info(`User authenticated userId: ${req.user.userId}`)
	next()
}
