import express from 'express'
import cors from 'cors'
import AppDataSource from '@/config/database'
import authRoutes from '@/routes/authRoutes'
import transactionRoutes from '@/routes/transactionRoutes'
import path from 'path'
import { fileURLToPath } from 'url' // Added import
import { dirname } from 'path' // Added import

const __filename = fileURLToPath(import.meta.url) // Added __filename definition
const __dirname = dirname(__filename) // Added __dirname definition

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/index.html'))
})
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

AppDataSource.initialize()
	.then(() => console.log('Database connected'))
	.catch((err) => console.error('DB Connection Error:', err))

app.listen(3000, () => console.log('Server running on port 3000'))

export default app
