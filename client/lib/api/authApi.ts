import { createApi } from '@reduxjs/toolkit/query/react'
import { AuthInput, AuthResponse } from '@shared/types'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { baseQuery } from './baseQueryApi'

const setAuthToken = async (data: AuthResponse) => {
	try {
		// Save the token based on the platform
		if (Platform.OS === 'web') {
			// Use localStorage for web
			localStorage.setItem('authToken', data.token)
		} else {
			// Use SecureStore for native platforms
			await SecureStore.setItemAsync('authToken', data.token)
		}

		console.log('Token saved to SecureStore.', data)
	} catch (error) {
		// Handle errors (e.g., log them)
		console.error('Failed to save token:', error)
	}
}

export const deleteAuthToken = async () => {
	try {
		// Remove the token based on the platform
		if (Platform.OS === 'web') {
			// Use localStorage for web
			localStorage.removeItem('authToken')
		} else {
			// Use SecureStore for native platforms
			await SecureStore.deleteItemAsync('authToken')
		}
		console.log('Token removed from SecureStore.')
	} catch (error) {
		// Handle errors (e.g., log them)
		console.error('Failed to remove token:', error)
	}
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery,
	endpoints: (build) => ({
		addRegister: build.mutation<AuthResponse, AuthInput>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			onQueryStarted: async function (arg, { queryFulfilled }) {
				// Wait for the mutation to succeed
				const { data } = await queryFulfilled
				await setAuthToken(data)
			},
		}),
		addLogin: build.mutation<AuthResponse, AuthInput>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
			onQueryStarted: async function (arg, { queryFulfilled }) {
				// Wait for the mutation to succeed
				const { data } = await queryFulfilled
				await setAuthToken(data)
			},
		}),
		getSession: build.query<AuthResponse, void>({
			query: () => `/auth/session`,
		}),
	}),
})

export const { useAddRegisterMutation, useAddLoginMutation } = authApi
