import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'

interface AuthState {
	user: { id: string; email: string; token: string } | null
}

const initialState: AuthState = {
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null
		},
		setUser(state, action) {
			state.user = action.payload
		},
	},
	extraReducers: (builder) => {
		// Listen for the addLogin mutation's fulfilled action
		builder.addMatcher(authApi.endpoints.addLogin.matchFulfilled, (state, action) => {
			state.user = action.payload // Update the user in the state
		})
	},
})

export const selectAuth = (state) => state.auth

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
