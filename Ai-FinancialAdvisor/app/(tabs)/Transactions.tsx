import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabThreeScreen() {
  const [db, setDb] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Not Processed');
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      fetchTransactions(database);
    };

    setupDatabase();
  }, []);

  // Function to fetch transactions from the database
  const fetchTransactions = async (database) => {
    const dbInstance = database || db;
    if (!dbInstance) return;

    const allRows = await dbInstance.getAllAsync('SELECT * FROM transactions');
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
      date.toISOString().split('T')[0],  // Store as YYYY-MM-DD
      amount,
      status
    );

    // Refresh the transaction list
    fetchTransactions();
    setDate(new Date());
    setAmount('');
    setStatus('Not Processed');
  };

  // Function to delete a transaction
  const deleteTransaction = async (id) => {
    await db.runAsync('DELETE FROM transactions WHERE id = ?', id);
    fetchTransactions(); // Refresh the transaction list
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons size={40} name="receipt" style={styles.icon} />
        <ThemedText type="title">Transactions</ThemedText>
      </View>

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.datePickerText}>Date: {date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Other Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* Status Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Not Processed" value="Not Processed" />
            <Picker.Item label="Processed" value="Processed" />
          </Picker>
        </View>

        <Button title="Add Transaction" onPress={addTransaction} />
      </View>

      {/* Table Header */}
      <View style={styles.header}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Amount</Text>
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Delete</Text>
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
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    color: '#555',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
    alignItems: 'center',
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
  deleteButton: {
    padding: 10,
  },
});
