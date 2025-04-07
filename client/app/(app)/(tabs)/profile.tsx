import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileScreen = () => {
	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<TouchableOpacity>
					<Icon name='arrow-left' size={24} color='#fff' />
				</TouchableOpacity>
				<ThemedText style={styles.title}>Profile</ThemedText>
				<TouchableOpacity>
					<Icon name='account-edit' size={24} color='#fff' />
				</TouchableOpacity>
			</ThemedView>

			<ThemedView style={styles.profileContainer}>
				<Image
					source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual image URL
					style={styles.profileImage}
				/>
				<ThemedView>
					<ThemedText style={styles.profileName}>Tanya Myroniuk</ThemedText>
					<ThemedText style={styles.profileRole}>Senior Designer</ThemedText>
				</ThemedView>
			</ThemedView>

			<ThemedView style={styles.menuContainer}>
				<TouchableOpacity style={styles.menuItem}>
					<ThemedView style={styles.menuItemLeft}>
						<Icon name='account-outline' size={24} color='#fff' />
						<ThemedText style={styles.menuText}>Personal Information</ThemedText>
					</ThemedView>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<ThemedView style={styles.menuItemLeft}>
						<Icon name='credit-card-outline' size={24} color='#fff' />
						<ThemedText style={styles.menuText}>Payment Preferences</ThemedText>
					</ThemedView>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<ThemedView style={styles.menuItemLeft}>
						<Icon name='bank-outline' size={24} color='#fff' />
						<ThemedText style={styles.menuText}>Banks and Cards</ThemedText>
					</ThemedView>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<ThemedView style={styles.menuItemLeft}>
						<Icon name='bell-outline' size={24} color='#fff' />
						<ThemedText style={styles.menuText}>Notifications</ThemedText>
					</ThemedView>
					<ThemedView style={styles.notificationBadge}>
						<ThemedText style={styles.notificationBadgeText}>2</ThemedText>
					</ThemedView>
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<ThemedView style={styles.menuItemLeft}>
						<Icon name='message-outline' size={24} color='#fff' />
						<ThemedText style={styles.menuText}>Message Center</ThemedText>
					</ThemedView>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<ThemedView style={styles.menuItemLeft}>
						<Icon name='map-marker-outline' size={24} color='#fff' />
						<ThemedText style={styles.menuText}>Address</ThemedText>
					</ThemedView>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuItem}>
					<ThemedView style={styles.menuItemLeft}>
						<Icon name='cog-outline' size={24} color='#fff' />
						<ThemedText style={styles.menuText}>Settings</ThemedText>
					</ThemedView>
					<Icon name='chevron-right' size={24} color='#aaa' />
				</TouchableOpacity>
			</ThemedView>
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
