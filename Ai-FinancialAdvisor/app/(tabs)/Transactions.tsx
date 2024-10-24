import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabThreeScreen() {
  // Sample data for the transactions table
  const transactions = [
    { id: '1', date: '2024-10-23', amount: '$100', status: 'Completed' },
    { id: '2', date: '2024-10-22', amount: '$50', status: 'Pending' },
    { id: '3', date: '2024-10-21', amount: '$200', status: 'Completed' },
  ];

  // Function to render each row in the table
  const renderTransaction = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.status}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Ionicons size={40} name="receipt" style={styles.icon} />
        <ThemedText type="title">Transactions</ThemedText>
      </View>
      
      {/* Table Header */}
      <View style={styles.header}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Amount</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.table} // Added style for spacing around FlatList
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Adjust to your theme
  },
  icon: {
    color: '#808080',
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  table: {
    paddingBottom: 20, // Prevent last item from being cut off
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
