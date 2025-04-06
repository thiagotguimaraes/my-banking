import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SignUpScreen = () => {
	const [fullName, setFullName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	return (
		<ThemedView style={styles.container}>
			<TouchableOpacity style={styles.backButton}>
				<Icon name='arrow-left' size={24} color='#fff' />
			</TouchableOpacity>
			<ThemedText style={styles.title}>Sign Up</ThemedText>
			<ThemedView style={styles.inputContainer}>
				<Icon name='account-outline' size={20} color='#fff' style={styles.icon} />
				<TextInput
					style={styles.input}
					placeholder='Full Name'
					placeholderTextColor='#aaa'
					value={fullName}
					onChangeText={setFullName}
				/>
			</ThemedView>
			<ThemedView style={styles.inputContainer}>
				<Icon name='phone-outline' size={20} color='#fff' style={styles.icon} />
				<TextInput
					style={styles.input}
					placeholder='Phone Number'
					placeholderTextColor='#aaa'
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					keyboardType='phone-pad'
				/>
			</ThemedView>
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
			<TouchableOpacity style={styles.signUpButton}>
				<ThemedText style={styles.signUpButtonText}>Sign Up</ThemedText>
			</TouchableOpacity>
			<TouchableOpacity>
				<ThemedText style={styles.existingUserText}>
					Already have an account. <ThemedText style={styles.signInText}>Sign Up</ThemedText>
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
	signUpButton: {
		backgroundColor: '#007BFF',
		borderRadius: 8,
		paddingVertical: 15,
		alignItems: 'center',
		marginBottom: 20,
	},
	signUpButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	existingUserText: {
		color: '#aaa',
		textAlign: 'center',
		fontSize: 14,
	},
	signInText: {
		color: '#007BFF',
		fontWeight: 'bold',
	},
})

export default SignUpScreen
