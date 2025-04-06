import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SettingsScreen = () => {
	const [isBiometricEnabled, setIsBiometricEnabled] = useState(false)

	const toggleBiometric = () => {
		setIsBiometricEnabled((previousState) => !previousState)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity>
					<Icon name='arrow-left' size={24} color='#fff' />
				</TouchableOpacity>
				<Text style={styles.title}>Settings</Text>
				<TouchableOpacity>
					<Icon name='cog-outline' size={24} color='#fff' />
				</TouchableOpacity>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>General</Text>
				<TouchableOpacity style={styles.row}>
					<Text style={styles.rowText}>Language</Text>
					<View style={styles.rowRight}>
						<Text style={styles.rowValue}>English</Text>
						<Icon name='chevron-right' size={24} color='#aaa' />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.row}>
					<Text style={styles.rowText}>My Profile</Text>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
				<TouchableOpacity style={styles.row}>
					<Text style={styles.rowText}>Contact Us</Text>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Security</Text>
				<TouchableOpacity style={styles.row}>
					<Text style={styles.rowText}>Change Password</Text>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
				<TouchableOpacity style={styles.row}>
					<Text style={styles.rowText}>Privacy Policy</Text>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
				<View style={styles.row}>
					<Text style={styles.rowText}>Biometric</Text>
					<Switch
						value={isBiometricEnabled}
						onValueChange={toggleBiometric}
						thumbColor={isBiometricEnabled ? '#007BFF' : '#aaa'}
						trackColor={{ false: '#767577', true: '#1E90FF' }}
					/>
				</View>
			</View>

			{/* <View style={styles.bottomNavigation}>
				<TouchableOpacity>
					<Icon name='home' size={24} color='#aaa' />
					<Text style={styles.navText}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='credit-card' size={24} color='#aaa' />
					<Text style={styles.navText}>My Cards</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='chart-bar' size={24} color='#aaa' />
					<Text style={styles.navText}>Statistics</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='cog' size={24} color='#007BFF' />
					<Text style={styles.navText}>Settings</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	title: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		color: '#aaa',
		fontSize: 14,
		marginBottom: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 8,
		padding: 15,
		marginBottom: 10,
	},
	rowText: {
		color: '#fff',
		fontSize: 16,
	},
	rowRight: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowValue: {
		color: '#aaa',
		fontSize: 14,
		marginRight: 10,
	},
	bottomNavigation: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderTopWidth: 1,
		borderTopColor: '#1E1E1E',
	},
	navText: {
		color: '#aaa',
		fontSize: 12,
		marginTop: 5,
		textAlign: 'center',
	},
})

export default SettingsScreen
