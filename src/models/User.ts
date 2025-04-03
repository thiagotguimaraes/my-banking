import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', unique: true, length: 255 })
	email: string

	@Column({ type: 'varchar' }) // Use 'varchar' for strings
	passwordHash: string

	@Column({ type: 'varchar', default: 'user' }) // Use 'varchar' for roles
	role: string

	@CreateDateColumn()
	createdAt: Date
}
