import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@/utils/jwtHelper'

export interface AuthRequest extends Request {
	user?: { userId: string; role: string }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
	const token = req.header('Authorization')?.split(' ')[1]

	if (!token) {
		res.status(401).json({ message: 'Unauthorized: No token provided' })
		return
	}

	const decoded = verifyToken(token)
	if (!decoded) {
		res.status(401).json({ message: 'Unauthorized: Invalid token' })
		return
	}

	req.user = decoded as { userId: string; role: string }
	next()
}
