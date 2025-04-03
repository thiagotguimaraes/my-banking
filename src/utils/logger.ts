import { createLogger, format, transports } from 'winston'

const logger = createLogger({
	level: process.env.LOGGER_LEVEL === 'production' ? 'info' : 'debug',
	format: format.combine(
		format.timestamp(),
		format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level.toUpperCase()}: ${message}`
		})
	),
	transports: [
		new transports.Console(),
		// Add file transport for production
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/combined.log' }),
	],
})

export default logger
