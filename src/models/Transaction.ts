import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User)
	user: User

	@Column({ type: 'varchar' })
	type: 'deposit' | 'withdrawal' | 'transfer'

	@Column('decimal', { precision: 10, scale: 2 })
	amount: number

	@Column({ type: 'varchar' })
	status: 'pending' | 'completed' | 'failed'

	@CreateDateColumn()
	createdAt: Date
}
