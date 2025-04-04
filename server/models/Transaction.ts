import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User)
	@JoinColumn({ name: 'userId' })
	user: User

	@Column({ type: 'int' })
	userId: number

	@Column({ type: 'varchar' })
	type: 'deposit' | 'withdrawal' | 'transfer' | 'payment'

	@Column('decimal', { precision: 10, scale: 2 })
	amount: number

	@Column({ type: 'varchar' })
	status: 'pending' | 'completed' | 'failed'

	@CreateDateColumn()
	createdAt: Date
}
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment'
export type TransactionStatus = 'pending' | 'completed' | 'failed'

export enum TransactionTypeEnum {
	DEPOSIT = 'deposit',
	WITHDRAWAL = 'withdrawal',
	TRANSFER = 'transfer',
	PAYMENT = 'payment',
}

export enum TransactionStatusEnum {
	PENDING = 'pending',
	COMPLETED = 'completed',
	FAILED = 'failed',
}
