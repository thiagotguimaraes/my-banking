import AppDataSource from '@/config/database'
import app from '@/index'
import { User } from '@/models/User'
import bcrypt from 'bcryptjs'
import request from 'supertest'

jest.mock('@/config/database', () => ({
	initialize: jest.fn().mockResolvedValue(true),
	getRepository: jest.fn().mockReturnValue({
		findOne: jest.fn(),
		create: jest.fn(),
		save: jest.fn(),
		createQueryBuilder: jest.fn().mockReturnValue({
			select: jest.fn().mockReturnThis(),
			where: jest.fn().mockReturnThis(),
			andWhere: jest.fn().mockReturnThis(),
			getRawOne: jest.fn(),
		}),
	}),
}))

let token: string = ''

describe('Authentication API', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should register a new user', async () => {
		;(AppDataSource.getRepository(User).findOne as jest.Mock).mockResolvedValue(null) // No existing user
		;(AppDataSource.getRepository(User).create as jest.Mock).mockImplementation(() => ({
			id: '1',
			email: 'testuser@example.com',
			role: 'user',
		}))
		;(AppDataSource.getRepository(User).save as jest.Mock).mockResolvedValue({
			id: '1',
			email: 'testuser@example.com',
			role: 'user',
		})

		const res = await request(app)
			.post('/api/auth/register')
			.send({ email: 'testuser@example.com', password: 'password123' })

		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
		token = res.body.token // Store token for further tests
	})

	it('should not register a user with existing email', async () => {
		;(AppDataSource.getRepository(User).findOne as jest.Mock).mockResolvedValue({
			id: '1',
			email: 'testuser@example.com',
		}) // Existing user

		const res = await request(app)
			.post('/api/auth/register')
			.send({ email: 'testuser@example.com', password: 'password123' })

		expect(res.status).toBe(400)
		expect(res.body.message).toBe('User already exists')
	})

	it('should login an existing user', async () => {
		;(AppDataSource.getRepository(User).findOne as jest.Mock).mockResolvedValue({
			id: '1',
			email: 'testuser@example.com',
			passwordHash: await bcrypt.hash('password123', 10),
		})

		const res = await request(app)
			.post('/api/auth/login')
			.send({ email: 'testuser@example.com', password: 'password123' })

		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
	})

	it('should reject login with invalid credentials', async () => {
		;(AppDataSource.getRepository(User).findOne as jest.Mock).mockResolvedValue({
			id: '1',
			email: 'testuser@example.com',
			passwordHash: await bcrypt.hash('password123', 10),
		})

		const res = await request(app)
			.post('/api/auth/login')
			.send({ email: 'testuser@example.com', password: 'wrongpassword' })

		expect(res.status).toBe(400)
		expect(res.body.message).toBe('Invalid credentials')
	})

	it('should reject access to protected routes without token', async () => {
		const res = await request(app).post('/api/transactions/deposit').send({ amount: 100 })

		expect(res.status).toBe(401)
		expect(res.body.message).toBe('Unauthorized: No token provided')
	})

	it('should allow access to protected routes with token', async () => {
		;(AppDataSource.getRepository(User).findOne as jest.Mock).mockResolvedValue({
			id: '1',
			email: 'testuser@example.com',
			passwordHash: await bcrypt.hash('password123', 10),
		})

		const res1 = await request(app)
			.post('/api/auth/login')
			.send({ email: 'testuser@example.com', password: 'password123' })

		const res = await request(app)
			.post('/api/transactions/deposit')
			.set('Authorization', `Bearer ${res1.body.token}`)
			.send({ amount: 100 })

		expect(res.status).toBe(200)
		expect(res.body.message).toBe('Transaction initiated')
	})
})
