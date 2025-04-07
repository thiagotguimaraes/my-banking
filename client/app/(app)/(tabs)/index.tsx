import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeScreen = () => {
	const transactions = [
		{ id: '1', name: 'Apple Store', category: 'Entertainment', amount: '- $5,99', icon: 'apple' },
		{ id: '2', name: 'Spotify', category: 'Music', amount: '- $12,99', icon: 'spotify' },
		{ id: '3', name: 'Money Transfer', category: 'Transaction', amount: '$300', icon: 'bank-transfer' },
		{ id: '4', name: 'Grocery', category: 'Shopping', amount: '- $88', icon: 'cart' },
	]

	const renderTransaction = ({ item }) => (
		<ThemedView style={styles.transactionItem}>
			<Icon name={item.icon} size={24} color='#fff' style={styles.transactionIcon} />
			<ThemedView style={styles.transactionDetails}>
				<ThemedText style={styles.transactionName}>{item.name}</ThemedText>
				<ThemedText style={styles.transactionCategory}>{item.category}</ThemedText>
			</ThemedView>
			<ThemedText
				style={[
					styles.transactionAmount,
					item.amount.startsWith('-') ? styles.negativeAmount : styles.positiveAmount,
				]}
			>
				{item.amount}
			</ThemedText>
		</ThemedView>
	)

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedView style={styles.profileContainer}>
					<Icon name='account-circle' size={40} color='#fff' />
					<ThemedView>
						<ThemedText style={styles.welcomeText}>Welcome back,</ThemedText>
						<ThemedText style={styles.userName}>Tanya Myroniuk</ThemedText>
					</ThemedView>
				</ThemedView>
				<TouchableOpacity>
					<Icon name='magnify' size={24} color='#fff' />
				</TouchableOpacity>
			</ThemedView>

			<ThemedView style={styles.cardContainer}>
				<ThemedView style={styles.card}>
					<ThemedText style={styles.cardNumber}>4562 1122 4595 7852</ThemedText>
					<ThemedView style={styles.cardDetails}>
						<ThemedView>
							<ThemedText style={styles.cardLabel}>AR Jonson</ThemedText>
							<ThemedText style={styles.cardLabel}>Expiry Date</ThemedText>
							<ThemedText style={styles.cardValue}>24/2000</ThemedText>
						</ThemedView>
						<ThemedView>
							<ThemedText style={styles.cardLabel}>CVV</ThemedText>
							<ThemedText style={styles.cardValue}>6986</ThemedText>
						</ThemedView>
					</ThemedView>
					<ThemedView style={styles.cardFooter}>
						<ThemedText style={styles.cardType}>Mastercard</ThemedText>
						<Icon name='credit-card' size={24} color='#fff' />
					</ThemedView>
				</ThemedView>
			</ThemedView>

			<ThemedView style={styles.actionsContainer}>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='arrow-up' size={24} color='#fff' />
					<ThemedText style={styles.actionText}>Sent</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='arrow-down' size={24} color='#fff' />
					<ThemedText style={styles.actionText}>Receive</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='bank' size={24} color='#fff' />
					<ThemedText style={styles.actionText}>Loan</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton}>
					<Icon name='plus-circle' size={24} color='#fff' />
					<ThemedText style={styles.actionText}>Topup</ThemedText>
				</TouchableOpacity>
			</ThemedView>

			<ThemedView style={styles.transactionContainer}>
				<ThemedView style={styles.transactionHeader}>
					<ThemedText style={styles.transactionTitle}>Transaction</ThemedText>
					<TouchableOpacity>
						<ThemedText style={styles.sellAllText}>Sell All</ThemedText>
					</TouchableOpacity>
				</ThemedView>
				<FlatList data={transactions} renderItem={renderTransaction} keyExtractor={(item) => item.id} />
			</ThemedView>

			{/* <ThemedView style={styles.bottomNavigation}>
				<TouchableOpacity>
					<Icon name='home' size={24} color='#007BFF' />
					<ThemedText style={styles.navText}>Home</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='credit-card' size={24} color='#fff' />
					<ThemedText style={styles.navText}>My Cards</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='chart-bar' size={24} color='#fff' />
					<ThemedText style={styles.navText}>Statistics</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name='cog' size={24} color='#fff' />
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
