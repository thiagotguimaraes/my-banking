import { AuthRequest } from '@/middlewares/authMiddleware'
import { getUserByEmail, registerUser, validateCredentials } from '@/services/authService'
import { generateToken } from '@/utils/jwtHelper'
import { Router } from 'express'
import { body, validationResult } from 'express-validator'

const router = Router()

// Register User
router.post(
	'/register',
	[body('email').isEmail(), body('password').isLength({ min: 8 })],
	async (req: AuthRequest, res: any) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

		const { email, password } = req.body
		const existingUser = await getUserByEmail(email)

		if (existingUser) return res.status(400).json({ message: 'User already exists' })

		const token = registerUser(email, password)

		res.json({ token })
	}
)

// Login User
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], async (req: AuthRequest, res: any) => {
	const { email, password } = req.body
	const user = await getUserByEmail(email)

	if (!user || (await validateCredentials(password, user)))
		return res.status(400).json({ message: 'Invalid credentials' })

	const token = generateToken(user.id, user.role)

	res.json({ token })
})

export default router
