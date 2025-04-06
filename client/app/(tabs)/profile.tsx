import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity>
					<Icon name='arrow-left' size={24} color='#fff' />
				</TouchableOpacity>
				<Text style={styles.title}>Profile</Text>
				<TouchableOpacity>
					<Icon name='account-edit' size={24} color='#fff' />
				</TouchableOpacity>
			</View>

			<View style={styles.profileContainer}>
				<Image
					source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual image URL
					style={styles.profileImage}
				/>
				<View>
					<Text style={styles.profileName}>Tanya Myroniuk</Text>
					<Text style={styles.profileRole}>Senior Designer</Text>
				</View>
			</View>

			<View style={styles.menuContainer}>
				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuItemLeft}>
						<Icon name='account-outline' size={24} color='#fff' />
						<Text style={styles.menuText}>Personal Information</Text>
					</View>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuItemLeft}>
						<Icon name='credit-card-outline' size={24} color='#fff' />
						<Text style={styles.menuText}>Payment Preferences</Text>
					</View>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuItemLeft}>
						<Icon name='bank-outline' size={24} color='#fff' />
						<Text style={styles.menuText}>Banks and Cards</Text>
					</View>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuItemLeft}>
						<Icon name='bell-outline' size={24} color='#fff' />
						<Text style={styles.menuText}>Notifications</Text>
					</View>
					<View style={styles.notificationBadge}>
						<Text style={styles.notificationBadgeText}>2</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuItemLeft}>
						<Icon name='message-outline' size={24} color='#fff' />
						<Text style={styles.menuText}>Message Center</Text>
					</View>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuItemLeft}>
						<Icon name='map-marker-outline' size={24} color='#fff' />
						<Text style={styles.menuText}>Address</Text>
					</View>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuItemLeft}>
						<Icon name='cog-outline' size={24} color='#fff' />
						<Text style={styles.menuText}>Settings</Text>
					</View>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
			</View>
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
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 30,
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 15,
	},
	profileName: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	profileRole: {
		color: '#aaa',
		fontSize: 14,
	},
	menuContainer: {
		marginTop: 10,
	},
	menuItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#1E1E1E',
		borderRadius: 8,
		padding: 15,
		marginBottom: 10,
	},
	menuItemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuText: {
		color: '#fff',
		fontSize: 16,
		marginLeft: 10,
	},
	notificationBadge: {
		backgroundColor: '#FF4D4D',
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 2,
	},
	notificationBadgeText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: 'bold',
	},
})

export default ProfileScreen
