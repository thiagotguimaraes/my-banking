import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import { generateToken } from '@/utils/jwtHelper'
import { AppDataSource } from '@/config/database'
import { User } from '@/models/User'

const router = Router()
const userRepo = AppDataSource.getRepository(User)

// Register User
router.post('/register', [body('email').isEmail(), body('password').isLength({ min: 6 })], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	const { email, password } = req.body
	const existingUser = await userRepo.findOne({ where: { email } })

	if (existingUser) return res.status(400).json({ message: 'User already exists' })

	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = userRepo.create({ email, password: hashedPassword, role: 'user' })

	await userRepo.save(newUser)
	const token = generateToken(newUser.id, newUser.role)

	res.json({ token })
})

// Login User
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], async (req, res) => {
	const { email, password } = req.body
	const user = await userRepo.findOne({ where: { email } })

	if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
		return res.status(400).json({ message: 'Invalid credentials' })
	}

	const token = generateToken(user.id, user.role)
	res.json({ token })
})

export default router
