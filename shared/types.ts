export interface User {
	id: number
	email: string
	passwordHash: string
	role: string
	createdAt: Date
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
