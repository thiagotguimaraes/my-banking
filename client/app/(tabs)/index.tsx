import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeScreen = () => {
	const transactions = [
		{ id: '1', name: 'Apple Store', category: 'Entertainment', amount: '- $5,99', icon: 'apple' },
		{ id: '2', name: 'Spotify', category: 'Music', amount: '- $12,99', icon: 'spotify' },
		{ id: '3', name: 'Money Transfer', category: 'Transaction', amount: '$300', icon: 'bank-transfer' },
		{ id: '4', name: 'Grocery', category: 'Shopping', amount: '- $88', icon: 'cart' },
	]

	const renderTransaction = ({ item }) => (
		<View style={styles.transactionItem}>
			<Icon name={item.icon} size={24} color='#fff' style={styles.transactionIcon} />
			<View style={styles.transactionDetails}>
				<Text style={styles.transactionName}>{item.name}</Text>
				<Text style={styles.transactionCategory}>{item.category}</Text>
			</View>
			<Text
				style={[
					styles.transactionAmount,
					item.amount.startsWith('-') ? styles.negativeAmount : styles.positiveAmount,
				]}
			>
				{item.amount}
			</Text>
		</View>
	)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.profileContainer}>
					<Icon name='account-circle' size={40} color='#fff' />
					<View>
						<Text style={styles.welcomeText}>Welcome back,</Text>
						<Text style={styles.userName}>Tanya Myroniuk</Text>
					</View>
				</View>
				<TouchableOpacity>
					<Icon name='magnify' size={24} color='#fff' />
				</TouchableOpacity>
			</View>

			<View style={styles.cardContainer}>
				<View style={styles.card}>
					<Text style={styles.cardNumber}>4562 1122 4595 7852</Text>
					<View style={styles.cardDetails}>
						<View>
							<Text style={styles.cardLabel}>AR Jonson</Text>
							<Text style={styles.cardLabel}>Expiry Date</Text>
							<Text style={styles.cardValue}>24/2000</Text>
						</View>
						<View>
							<Text style={styles.cardLabel}>CVV</Text>
							<Text style={styles.cardValue}>6986</Text>
						</View>
					</View>
					<View style={styles.cardFooter}>
						<Text style={styles.cardType}>Mastercard</Text>
						<Icon name='credit-card' size={24} color='#fff' />
					</View>
				</View>
			</View>

			<View style={styles.actionsContainer}>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='arrow-up' size={24} color='#fff' />
					<Text style={styles.actionText}>Sent</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='arrow-down' size={24} color='#fff' />
					<Text style={styles.actionText}>Receive</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='bank' size={24} color='#fff' />
					<Text style={styles.actionText}>Loan</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='plus-circle' size={24} color='#fff' />
					<Text style={styles.actionText}>Topup</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.transactionContainer}>
				<View style={styles.transactionHeader}>
					<Text style={styles.transactionTitle}>Transaction</Text>
					<TouchableOpacity>
						<Text style={styles.sellAllText}>Sell All</Text>
					</TouchableOpacity>
				</View>
				<FlatList data={transactions} renderItem={renderTransaction} keyExtractor={(item) => item.id} />
			</View>

			{/* <View style={styles.bottomNavigation}>
				<TouchableOpacity>
					<Icon name='home' size={24} color='#007BFF' />
					<Text style={styles.navText}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='credit-card' size={24} color='#fff' />
					<Text style={styles.navText}>My Cards</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='chart-bar' size={24} color='#fff' />
					<Text style={styles.navText}>Statistics</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='cog' size={24} color='#fff' />
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
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	welcomeText: {
		color: '#aaa',
		fontSize: 14,
	},
	userName: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	cardContainer: {
		marginBottom: 20,
	},
	card: {
		backgroundColor: '#1E1E1E',
		borderRadius: 12,
		padding: 20,
	},
	cardNumber: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	cardDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	cardLabel: {
		color: '#aaa',
		fontSize: 12,
	},
	cardValue: {
		color: '#fff',
		fontSize: 14,
	},
	cardFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardType: {
		color: '#fff',
		fontSize: 14,
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	actionButton: {
		alignItems: 'center',
	},
	actionText: {
		color: '#fff',
		fontSize: 12,
		marginTop: 5,
	},
	transactionContainer: {
		flex: 1,
	},
	transactionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	transactionTitle: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	sellAllText: {
		color: '#007BFF',
		fontSize: 14,
	},
	transactionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},
	transactionIcon: {
		marginRight: 10,
	},
	transactionDetails: {
		flex: 1,
	},
	transactionName: {
		color: '#fff',
		fontSize: 16,
	},
	transactionCategory: {
		color: '#aaa',
		fontSize: 12,
	},
	transactionAmount: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	negativeAmount: {
		color: '#FF4D4D',
	},
	positiveAmount: {
		color: '#4CAF50',
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

export default HomeScreen
