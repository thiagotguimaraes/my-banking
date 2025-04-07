import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import { Transaction as TransactionType } from '@shared/types'

@Entity()
export class Transaction implements TransactionType {
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
