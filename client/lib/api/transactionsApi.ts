import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQueryApi'
import { Transaction } from '@shared/types'

export const transactionsApi = createApi({
	reducerPath: 'transactionsApi',
	baseQuery,
	tagTypes: ['Transactions', 'Balance'],
	endpoints: (build) => ({
		getTransactions: build.query<Transaction[], void>({
			query: () => '/transactions/all',
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Transactions' as const, id })),
							{ type: 'Transactions', id: 'LIST' },
					  ]
					: [{ type: 'Transactions', id: 'LIST' }],
		}),
		addTransaction: build.mutation<Transaction, Partial<Transaction>>({
			query: ({ type, ...body }) => ({
				url: `/transactions/${type}`,
				method: 'POST',
				body,
			}),
		}),
		getBalance: build.query<Transaction, string>({
			query: () => `/balance`,
			providesTags: (result, error, id) => [{ type: 'Balance', id }],
		}),
	}),
})

export const { useGetBalanceQuery, useGetTransactionsQuery, useAddTransactionMutation } = transactionsApi
