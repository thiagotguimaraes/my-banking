import request from 'supertest'
import app from '@/index'
import { User } from '@/models/User'
import bcrypt from 'bcryptjs'
import AppDataSource from '@/config/database'

jest.mock('@/config/database', () => ({
	initialize: jest.fn().mockResolvedValue(true),
	getRepository: jest.fn().mockReturnValue({
		findOne: jest.fn().mockResolvedValue({
			id: '1',
			email: 'testuser@example.com',
			passwordHash: '$2b$10$vetXdhBVVeC/llAVs2awdOooPZJWIPW8dVXGgIHYKeqBydhwD/4ci',
		}),
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

beforeAll(async () => {
	const res = await request(app)
		.post('/api/auth/login')
		.send({ email: 'testuser@example.com', password: 'password123' })

	token = res.body.token
})

describe('Transactions API', () => {
	it('should allow a user to deposit money', async () => {
		const res = await request(app)
			.post('/api/transactions/deposit')
			.set('Authorization', `Bearer ${token}`)
			.send({ amount: 500 })

		expect(res.status).toBe(200)
		expect(res.body.message).toBe('Transaction initiated')
	})

	it('should allow a user to withdraw money', async () => {
		const res = await request(app)
			.post('/api/transactions/withdrawal')
			.set('Authorization', `Bearer ${token}`)
			.send({ amount: 300 })

		expect(res.status).toBe(200)
		expect(res.body.message).toBe('Transaction initiated')
	})

	it('should reject transactions with invalid amounts', async () => {
		const res = await request(app)
			.post('/api/transactions/deposit')
			.set('Authorization', `Bearer ${token}`)
			.send({ amount: -50 })

		expect(res.status).toBe(400)
		expect(res.body.message).toBe('Invalid amount')
	})
})
