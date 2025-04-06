import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SettingsScreen = () => {
	const [isBiometricEnabled, setIsBiometricEnabled] = useState(false)

	const toggleBiometric = () => {
		setIsBiometricEnabled((previousState) => !previousState)
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<TouchableOpacity>
					<Icon name='arrow-left' size={24} color='#fff' />
				</TouchableOpacity>
				<ThemedText style={styles.title}>Settings</ThemedText>
				<TouchableOpacity>
					<Icon name='cog-outline' size={24} color='#fff' />
				</TouchableOpacity>
			</ThemedView>

			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>General</ThemedText>
				<TouchableOpacity style={styles.row}>
					<ThemedText style={styles.rowText}>Language</ThemedText>
					<ThemedView style={styles.rowRight}>
						<ThemedText style={styles.rowValue}>English</ThemedText>
						<Icon name='chevron-right' size={24} color='#aaa' />
					</ThemedView>
				</TouchableOpacity>
				<TouchableOpacity style={styles.row}>
					<ThemedText style={styles.rowText}>My Profile</ThemedText>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
				<TouchableOpacity style={styles.row}>
					<ThemedText style={styles.rowText}>Contact Us</ThemedText>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
			</ThemedView>

			<ThemedView style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Security</ThemedText>
				<TouchableOpacity style={styles.row}>
					<ThemedText style={styles.rowText}>Change Password</ThemedText>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
				<TouchableOpacity style={styles.row}>
					<ThemedText style={styles.rowText}>Privacy Policy</ThemedText>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
				<ThemedView style={styles.row}>
					<ThemedText style={styles.rowText}>Biometric</ThemedText>
					<Switch
						value={isBiometricEnabled}
						onValueChange={toggleBiometric}
						thumbColor={isBiometricEnabled ? '#007BFF' : '#aaa'}
						trackColor={{ false: '#767577', true: '#1E90FF' }}
					/>
				</ThemedView>
			</ThemedView>

			{/* <ThemedView style={styles.bottomNavigation}>
				<TouchableOpacity>
					<Icon name='home' size={24} color='#aaa' />
					<ThemedText style={styles.navText}>Home</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='credit-card' size={24} color='#aaa' />
					<ThemedText style={styles.navText}>My Cards</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='chart-bar' size={24} color='#aaa' />
					<ThemedText style={styles.navText}>Statistics</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='cog' size={24} color='#007BFF' />
					<ThemedText style={styles.navText}>Settings</ThemedText>
				</TouchableOpacity>
			</ThemedView> */}
		</ThemedView>
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
