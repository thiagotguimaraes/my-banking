import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ToastProps {
	message: string
	visible: boolean
	onClose: () => void
	duration?: number // in milliseconds
}

const Toast: React.FC<ToastProps> = ({ message, visible, onClose, duration = 3000 }) => {
	const [fadeAnim] = useState(new Animated.Value(0))

	useEffect(() => {
		if (visible) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start()

			const timer = setTimeout(() => {
				handleClose()
			}, duration)

			return () => clearTimeout(timer)
		}
	}, [visible])

	const handleClose = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => onClose())
	}

	if (!visible) return null

	return (
		<Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
			<TouchableOpacity onPress={handleClose}>
				<Text style={styles.toastText}>{message}</Text>
			</TouchableOpacity>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	toastContainer: {
		position: 'absolute',
		bottom: 50,
		left: 20,
		right: 20,
		backgroundColor: '#333',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	toastText: {
		color: '#fff',
		fontSize: 16,
	},
})

export default Toast
