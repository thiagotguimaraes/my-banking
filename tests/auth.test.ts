import request from 'supertest'
import app from '@/server'
import AppDataSource from '@/config/database'
import { User } from '@/models/User'
import bcrypt from 'bcryptjs'

const mockUserRepo = {
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
	initialize: jest.fn(),
}

jest.mock('@/config/database', () => ({
	initialize: async () => {
		return await Promise.resolve(true)
	},
	getRepository: (type: User) => mockUserRepo,
}))

let token: string = ''

describe('Authentication API', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should register a new user', async () => {
		mockUserRepo.findOne.mockResolvedValue(Promise.resolve(null)) // No existing user
		mockUserRepo.create.mockReturnValue({ id: '1', email: 'testuser@example.com', role: 'user' })
		mockUserRepo.save.mockResolvedValue({ id: '1', email: 'testuser@example.com', role: 'user' })

		const res = await request(app)
			.post('/api/auth/register')
			.send({ email: 'testuser@example.com', password: 'password123' })

		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
		token = res.body.token // Store token for further tests
	})

	it('should not register a user with existing email', async () => {
		mockUserRepo.findOne.mockResolvedValue({ id: '1', email: 'testuser@example.com' }) // Existing user

		const res = await request(app)
			.post('/api/auth/register')
			.send({ email: 'testuser@example.com', password: 'password123' })

		expect(res.status).toBe(400)
		expect(res.body.message).toBe('User already exists')
	})

	it('should login an existing user', async () => {
		mockUserRepo.findOne.mockResolvedValue({
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
		mockUserRepo.findOne.mockResolvedValue({
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
		mockUserRepo.findOne.mockResolvedValue({
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
