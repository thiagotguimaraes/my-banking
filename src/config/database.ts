import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true, // Set false in production
	logging: false,
	entities: ['src/models/*.ts'],
})

AppDataSource.initialize()
	.then(() => console.log('Database connected'))
	.catch((err) => console.error('Database connection error:', err))
