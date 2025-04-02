import express from 'express'
import AppDataSource from '@/config/database'
import authRoutes from '@/routes/authRoutes'
import transactionRoutes from '@/routes/transactionRoutes'

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

AppDataSource.initialize()
	.then(() => console.log('Database connected'))
	.catch((err) => console.error('DB Connection Error:', err))

app.listen(3000, () => console.log('Server running on port 3000'))

export default app
