import { createApi } from '@reduxjs/toolkit/query/react'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { baseQuery } from './baseQueryApi'

export interface Auth {
	email: string
	password: string
}

export interface User {
	id: String
	email: string
	token: string
}

const setAuthToken = async (arg, { queryFulfilled }) => {
	try {
		// Wait for the mutation to succeed
		const { data } = await queryFulfilled

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

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery,
	endpoints: (build) => ({
		addRegister: build.mutation<User, Partial<User>>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			onQueryStarted: setAuthToken,
		}),
		addLogin: build.mutation<User, Partial<Auth>>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
			onQueryStarted: setAuthToken,
		}),
	}),
})

export const { useAddRegisterMutation, useAddLoginMutation } = authApi
