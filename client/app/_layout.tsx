import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import StoreProvider from '@/components/ProviderStore'
import { useColorScheme } from '@/hooks/useColorScheme'
import { authApi } from '@/lib/api/authApi'
import store from '@/lib/store/store'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	useEffect(() => {
		store
			.dispatch(authApi.endpoints.getSession.initiate())
			.unwrap()
			.then((result) => {
				console.log('Session loaded:', result)
			})
			.catch((error) => {
				console.error('Failed to load session:', error)
			})
	}, [])

	if (!loaded) {
		return null
	}

	return (
		<StoreProvider>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Slot />
			</ThemeProvider>
		</StoreProvider>
	)
}
