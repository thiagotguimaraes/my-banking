export interface AuthInput {
	email: string
	password: string
}

export interface User {
	id: number
	email: string
	passwordHash: string
	role: string
	createdAt: Date
}

export interface UserData {
	id: number
	email: string
	role: string
	createdAt: Date
}

export interface AuthResponse {
	token: string
	user: UserData | undefined
}

export interface Transaction {
	id: number
	userId: number
	type: TransactionType
	amount: number
	status: TransactionStatus
	createdAt: Date
}

export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment'
export type TransactionStatus = 'pending' | 'completed' | 'failed'
