import AppDataSource from '@/server/config/database'
import { User } from '@/server/models/User'
import { generateToken } from '@/server/utils/jwtHelper'
import bcrypt from 'bcryptjs'

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
	const userRepo = AppDataSource.getRepository(User)
	return (await userRepo.findOne({ where: { email } })) ?? undefined
}

export const registerUser = async (email: string, password: string): Promise<string> => {
	const userRepo = AppDataSource.getRepository(User)
	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = userRepo.create({ email, passwordHash: hashedPassword })

	const savedNewUser = await userRepo.save(newUser)
	return generateToken(savedNewUser.id, savedNewUser.role)
}

export const validateCredentials = async (password: string, user?: User): Promise<boolean> => {
	return !user || !(await bcrypt.compare(password, user.passwordHash))
}
