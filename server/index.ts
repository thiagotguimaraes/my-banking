import AppDataSource from '@/config/database'
import authRoutes from '@/routes/authRoutes'
import transactionRoutes from '@/routes/transactionRoutes'
import dotenv from 'dotenv'
import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import kafka from './config/kafka'
import { createAdminUserIfNotExists } from './services/authService'
import { consumeTransactions } from './services/transactionService'
import logger from './utils/logger'

dotenv.config()

const MODE = process.env.NODE_ENV || 'development'

const SERVER_PORT = process.env.SERVER_PORT || 3000

const app = express()
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.get('/', (req, res) => {
	// Sending simple HTML file as response to '/' requests
	res.sendFile(path.join(__dirname, './index.html'))
})

app.use('/api/auth', authRoutes)

app.use('/api/transactions', transactionRoutes)

AppDataSource.initialize()
	.then(async () => {
		logger.info('Database connected')
		if (MODE === 'production') {
			logger.info('Running in production mode')
		} else {
			logger.info('Running in development mode')
			createAdminUserIfNotExists()
		}
		await kafka.initKafka()
		consumeTransactions()
	})
	.catch((err) => logger.error('DB Connection Error:', err))

app.listen(SERVER_PORT, () => logger.info(`Server running on port ${SERVER_PORT}`))

export default app
