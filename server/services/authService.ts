import AppDataSource from '@/config/database'
import { User } from '@/models/User'
import { generateToken } from '@/utils/jwtHelper'
import logger from '@/utils/logger'
import { AuthResponse, UserData } from '@shared/types'
import bcrypt from 'bcryptjs'

const userRepo = AppDataSource.getRepository(User)

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
	return (await userRepo.findOne({ where: { email } })) ?? undefined
}

export const getUserById = async (userId: any): Promise<UserData | undefined> => {
	return removePasswordFromUser((await userRepo.findOne({ where: { id: userId } })) ?? undefined)
}

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
	const hashedPassword = await encryptPassword(password)
	const newUser = userRepo.create({ email, passwordHash: hashedPassword })

	const savedNewUser = await userRepo.save(newUser)
	const token = generateToken(savedNewUser.id, savedNewUser.role)

	return { user: removePasswordFromUser(savedNewUser), token }
}

export const encryptPassword = async (password: string) => {
	return await bcrypt.hash(password, 10)
}

export const validateCredentials = async (password: string, user?: User): Promise<boolean> => {
	return !user || !(await bcrypt.compare(password, user.passwordHash))
}

export const createAdminUserIfNotExists = async () => {
	if (!(await getUserByEmail('admin'))) {
		const adminUser = userRepo.create({
			email: 'admin',
			passwordHash: await encryptPassword('admin'),
			role: 'admin',
		})
		await userRepo.save(adminUser)

		logger.info('Admin user created in development mode only')
	}

	logger.info('Admin user | user: admin | password: admin')
}

export const removePasswordFromUser = (user: User | undefined): UserData | undefined => {
	if (!user) {
		return undefined
	}

	const { passwordHash, ...userWithoutPassword } = user
	return userWithoutPassword as UserData
}
