import AppDataSource from '@/config/database'
import { User } from '@/models/User'
import { generateToken } from '@/utils/jwtHelper'
import bcrypt from 'bcryptjs'

export const getUserByEmail = async (email: string) => {
	const userRepo = AppDataSource.getRepository(User)
	console.log('a')

	return (await userRepo.findOne({ where: { email } })) ?? undefined
}

export const registerUser = async (email: string, password: string) => {
	const userRepo = AppDataSource.getRepository(User)
	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = userRepo.create({ email, passwordHash: hashedPassword })

	await userRepo.save(newUser)
	return generateToken(newUser.id, newUser.role)
}

export const validateCredentials = async (password: string, user?: User) => {
	return !user || !(await bcrypt.compare(password, user.passwordHash))
}
