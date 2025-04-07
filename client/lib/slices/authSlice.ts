import { createSlice } from '@reduxjs/toolkit'
import { UserData } from '@shared/types'
import { authApi, deleteAuthToken } from '../api/authApi'
import { AppDispatch, RootState } from '../store/store'

interface AuthState {
	user: UserData | null | undefined
	sessionLoading: boolean | null | undefined
}

const initialState: AuthState = {
	user: null,
	sessionLoading: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			return {
				...state,
				user: null,
				sessionLoading: false,
			}
		},
	},
	extraReducers: (builder) => {
		// Listen for the addLogin mutation's fulfilled action
		builder.addMatcher(authApi.endpoints.addLogin.matchFulfilled, (state, action) => {
			state.user = action.payload.user
		})

		// Listen for the getSession mutation's fulfilled action
		builder.addMatcher(authApi.endpoints.getSession.matchPending, (state, action) => {
			state.sessionLoading = true
		})
		builder.addMatcher(authApi.endpoints.getSession.matchFulfilled, (state, action) => {
			let newState = { ...state }

			if (action.payload.user) newState.user = action.payload.user
			else newState.user = initialState.user

			newState.sessionLoading = false

			return newState
		})
		builder.addMatcher(authApi.endpoints.getSession.matchRejected, (state, action) => {
			state.user = initialState.user
			state.sessionLoading = false
		})
	},
})

export const logoutAction = () => async (dispatch: AppDispatch) => {
	await deleteAuthToken()
	dispatch(logout())
}

export const selectAuth = (state: RootState) => state.auth

export const { logout } = authSlice.actions
export default authSlice.reducer
