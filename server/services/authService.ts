import AppDataSource from '@/config/database'
import { User } from '@/models/User'
import { generateToken } from '@/utils/jwtHelper'
import logger from '@/utils/logger'
import { UserData } from '@shared/types'
import bcrypt from 'bcryptjs'

const userRepo = AppDataSource.getRepository(User)

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
	return (await userRepo.findOne({ where: { email } })) ?? undefined
}

export const getUserById = async (userId: any): Promise<UserData | undefined> => {
	let user = (await userRepo.findOne({ where: { id: userId } })) ?? undefined

	if (user) {
		const { passwordHash, ...userWithoutPassword } = user
		user = userWithoutPassword as User
	}

	return user as UserData
}

export const registerUser = async (email: string, password: string): Promise<string> => {
	const hashedPassword = await encryptPassword(password)
	const newUser = userRepo.create({ email, passwordHash: hashedPassword })

	const savedNewUser = await userRepo.save(newUser)
	return generateToken(savedNewUser.id, savedNewUser.role)
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
