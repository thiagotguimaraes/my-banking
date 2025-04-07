import { authMiddleware, AuthRequest } from '@/middlewares/authMiddleware'
import { getUserByEmail, getUserById, registerUser, validateCredentials } from '@/services/authService'
import { generateToken } from '@/utils/jwtHelper'
import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import logger from '@/utils/logger' // Import logger
import { User } from '@/models/User'

const router = Router()

// Register User
router.post(
	'/register',
	[body('email').isEmail(), body('password').isLength({ min: 8 })],
	async (req: AuthRequest, res: any) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			logger.warn('Validation errors during registration', errors.array()) // Log validation errors
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body
		try {
			const existingUser = await getUserByEmail(email)

			if (existingUser) {
				logger.warn('User already exists', email) // Log existing user
				return res.status(400).json({ message: 'User already exists' })
			}

			const token = await registerUser(email, password)
			logger.info('User registered successfully', email) // Log successful registration
			res.json({ token })
		} catch (error) {
			logger.error('Error during user registration:', error) // Log error
			res.status(500).json({ message: 'Internal server error' })
		}
	}
)

// Login User
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], async (req: AuthRequest, res: any) => {
	logger.info('Login endpoint hit')
	const { email, password } = req.body
	try {
		const user = await getUserByEmail(email)

		if (!user || (await validateCredentials(password, user))) {
			logger.warn('Invalid login credentials', email) // Log invalid credentials
			return res.status(400).json({ message: 'Invalid credentials' })
		}

		const token = generateToken(user.id, user.role)
		logger.info('User logged in successfully', email) // Log successful login
		res.json({ token })
	} catch (error) {
		logger.error('Error during user login', error) // Log error
		res.status(500).json({ message: 'Internal server error' })
	}
})

// Get User Session
router.get('/session', authMiddleware, async (req: AuthRequest, res: any) => {
	const userId = req.user?.userId
	if (!userId) {
		res.status(400).json({ message: 'User ID is required' })
		return
	}

	logger.info(`Session check for userId: ${userId}`) // Log session check
	const user = await getUserById(userId)

	res.status(200).json({ user })
})

// TODO: Make logout

export default router
