import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { selectAuth } from '@/lib/slices/authSlice'
import { useAppSelector } from '@/lib/store/hooks'
import LoadingScreen from '../loading'
import SignInScreen from '../signin'

export default function TabLayout() {
	const colorScheme = useColorScheme()

	const auth = useAppSelector(selectAuth)
	const { user, sessionLoading } = auth

	if (!user && (sessionLoading === null || sessionLoading === true)) return <LoadingScreen />

	if (!user && sessionLoading === false) return <SignInScreen />

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='house.fill' color={color} />,
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					tabBarIcon: ({ color }) => <IconSymbol size={28} name='paperplane.fill' color={color} />,
				}}
			/>
		</Tabs>
	)
}
