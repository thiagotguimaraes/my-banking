import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { User as UserType } from '@shared/types'

@Entity()
export class User implements UserType {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', unique: true, length: 255 })
	email: string

	@Column({ type: 'varchar' }) // Use 'varchar' for strings
	passwordHash: string

	@Column({ type: 'varchar', default: 'user' }) // Use 'varchar' for roles
	role: string

	@CreateDateColumn()
	createdAt: Date
}
