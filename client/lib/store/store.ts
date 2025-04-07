import { configureStore } from '@reduxjs/toolkit'
import { transactionsApi } from '../api/transactionsApi'
import { authApi } from '../api/authApi'
import authSliceReducer from '../slices/authSlice'

export const makeStore = () => {
	return configureStore({
		reducer: {
			[transactionsApi.reducerPath]: transactionsApi.reducer,
			[authApi.reducerPath]: authApi.reducer,
			auth: authSliceReducer,
		},
		// adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(transactionsApi.middleware).concat(authApi.middleware),
	})
}

const store = makeStore()
export default store

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
