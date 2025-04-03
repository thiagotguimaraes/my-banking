import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'string', unique: true })
	email: string

	@Column({ type: 'string' })
	passwordHash: string

	@Column({ type: 'string', default: 'user' }) // Roles: user, admin
	role: string

	@CreateDateColumn()
	createdAt: Date
}
