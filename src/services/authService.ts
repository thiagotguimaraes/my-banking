import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '@/models/User'
import { AppDataSource } from '@/config/database'

const userRepo = AppDataSource.getRepository(User)

export const registerUser = async (email: string, password: string) => {
	const existingUser = await userRepo.findOne({ where: { email } })
	if (existingUser) throw new Error('User already exists')

	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = userRepo.create({ email, passwordHash: hashedPassword })
	await userRepo.save(newUser)

	return generateToken(newUser.id)
}

export const loginUser = async (email: string, password: string) => {
	const user = await userRepo.findOne({ where: { email } })
	if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
		throw new Error('Invalid credentials')
	}
	return generateToken(user.id)
}

const generateToken = (userId: string) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
}
