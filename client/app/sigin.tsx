import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useAddLoginMutation } from '@/lib/api/authApi'
import { selectAuth } from '@/lib/slices/authSlice'
import { useAppSelector } from '@/lib/store/hooks'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SignInScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [loginAction, { isLoading: isLoadingLogin }] = useAddLoginMutation()
	const auth = useAppSelector(selectAuth)

	const handleSubmit = async () => {
		const { user } = await loginAction({ email, password }).unwrap()
		router.navigate('/')
	}

	return (
		<ThemedView style={styles.container}>
			<TouchableOpacity style={styles.backButton}>
				<Icon name='arrow-left' size={24} color='#fff' />
			</TouchableOpacity>
			<ThemedText style={styles.title}>Sign In</ThemedText>
			<ThemedView style={styles.inputContainer}>
				<Icon name='email-outline' size={20} color='#fff' style={styles.icon} />
				<TextInput
					style={styles.input}
					placeholder='Email Address'
					placeholderTextColor='#aaa'
					value={email}
					onChangeText={setEmail}
					keyboardType='email-address'
					autoCapitalize='none'
				/>
			</ThemedView>
			<ThemedView style={styles.inputContainer}>
				<Icon name='lock-outline' size={20} color='#fff' style={styles.icon} />
				<TextInput
					style={styles.input}
					placeholder='Password'
					placeholderTextColor='#aaa'
					value={password}
					onChangeText={setPassword}
					secureTextEntry={!showPassword}
				/>
				<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
					<Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color='#fff' />
				</TouchableOpacity>
			</ThemedView>
			<TouchableOpacity style={styles.signInButton} onPress={handleSubmit} disabled={isLoadingLogin}>
				<ThemedText style={styles.signInButtonText}>Sign In</ThemedText>
			</TouchableOpacity>
			<TouchableOpacity>
				<ThemedText style={styles.newUserText}>
					I’m a new user. <ThemedText style={styles.signUpText}>Sign Up</ThemedText>
				</ThemedText>
			</TouchableOpacity>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
		padding: 20,
		justifyContent: 'center',
	},
	backButton: {
		position: 'absolute',
		top: 40,
		left: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 40,
		textAlign: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 8,
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		color: '#fff',
		fontSize: 16,
		paddingVertical: 10,
	},
	eyeIcon: {
		padding: 5,
	},
	signInButton: {
		backgroundColor: '#007BFF',
		borderRadius: 8,
		paddingVertical: 15,
		alignItems: 'center',
		marginBottom: 20,
	},
	signInButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	newUserText: {
		color: '#aaa',
		textAlign: 'center',
		fontSize: 14,
	},
	signUpText: {
		color: '#007BFF',
		fontWeight: 'bold',
	},
})

export default SignInScreen
