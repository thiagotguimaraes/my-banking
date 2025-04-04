import { Kafka, Partitioners } from 'kafkajs'
import dotenv from 'dotenv'
import logger from '@/utils/logger'

dotenv.config()

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092'

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [KAFKA_BROKER],
})

const producer = kafka.producer({
	createPartitioner: Partitioners.LegacyPartitioner, // Use the legacy partitioner
})
const consumer = kafka.consumer({ groupId: 'transaction-group' })

const initKafka = async (): Promise<void> => {
	await producer.connect()
	await consumer.connect()
	logger.info(`Kafka connected on: ${KAFKA_BROKER}`)
}

const TopicsEnum = {
	TRANSACTIONS: 'transactions',
}

export default { producer, consumer, initKafka, TopicsEnum }
