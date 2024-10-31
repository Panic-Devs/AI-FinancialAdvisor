import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, Button, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabThreeScreen() {
  const [db, setDb] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const setupDatabase = async () => {
      // Open the database asynchronously
      const database = await SQLite.openDatabaseAsync('transactions.db');
      setDb(database);

      // Create the table if it doesn't exist
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT,
          amount TEXT,
          status TEXT
        );
      `);

      // Fetch any existing transactions from the database
      fetchTransactions();
    };

    setupDatabase();
  }, []);

  // Function to fetch transactions from the database
  const fetchTransactions = async () => {
    if (!db) return;

    const allRows = await db.getAllAsync('SELECT * FROM transactions');
    setTransactions(allRows);
  };

  // Function to add a new transaction
  const addTransaction = async () => {
    if (!date || !amount || !status) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    await db.runAsync(
      'INSERT INTO transactions (date, amount, status) VALUES (?, ?, ?)',
      date,
      amount,
      status
    );

    // Refresh the transaction list and clear input fields
    fetchTransactions();
    setDate('');
    setAmount('');
    setStatus('');
  };

  // Function to render each transaction
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

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={setStatus}
        />
        <Button title="Add Transaction" onPress={addTransaction} />
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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.table}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  table: {
    paddingBottom: 20,
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
