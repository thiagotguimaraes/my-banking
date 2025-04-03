import jwt from 'jsonwebtoken'

const SECRET_KEY: jwt.Secret = process.env.JWT_SECRET || 'fuwehfhwepofhoewurfhuoewrf'
const EXPIRATION_KEY: jwt.SignOptions['expiresIn'] = Number(process.env.JWT_SECRET_EXPIRES_IN || 60000)

export const generateToken = (userId: string, role: string): string => {
	return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: EXPIRATION_KEY })
}

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET_KEY)
	} catch (error) {
		return null
	}
}
