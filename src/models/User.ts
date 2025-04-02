import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	email: string

	@Column()
	passwordHash: string

	@Column({ default: 'user' }) // Roles: user, admin
	role: string

	@CreateDateColumn()
	createdAt: Date
}
