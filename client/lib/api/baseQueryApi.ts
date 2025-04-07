import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

// Create a base query with token handling
export const baseQuery = fetchBaseQuery({
	baseUrl: '/api', // Base URL for all requests
	prepareHeaders: async (headers) => {
		// Retrieve the token based on the platform
		let token: string | null = null
		if (Platform.OS === 'web') {
			// Web platform: Get token from localStorage
			token = localStorage.getItem('authToken')
		} else {
			// Native: Get token from SecureStore
			token = await SecureStore.getItemAsync('authToken')
		}

		// Add the token to the Authorization header if it exists
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}

		return headers
	},
})
