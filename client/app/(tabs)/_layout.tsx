import { router, Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { Platform } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useAppSelector } from '@/lib/store/hooks'
import { selectAuth } from '@/lib/slices/authSlice'

export default function TabLayout() {
	const colorScheme = useColorScheme()

	const { user, status } = useAppSelector(selectAuth)

	useEffect(() => {
		if (status === 'authenticated') {
			// User is not authenticated, redirect to sign-in screen
			// router.replace('/') // Use replace to avoid adding to the navigation stack
		} else {
			// User is authenticated, navigate to the index tab
			// router.replace('/index')
		}
	}, [user, router])

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
