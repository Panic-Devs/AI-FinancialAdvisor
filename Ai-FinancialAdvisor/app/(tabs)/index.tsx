import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Easing, View, Text, TextInput, Button, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';

let db;

const setupDatabaseAsync = async () => {
  db = await SQLite.openDatabaseAsync('transactions.db');
  
  // Create users table if it doesn't exist
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      pay_range TEXT NOT NULL
    );
  `);
  console.log("Database and users table initialized");
};

// Function to save user details to the database using `runAsync`
const saveUserDetailsAsync = async (name, email, payRange) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO users (name, email, pay_range) VALUES (?, ?, ?)',
      [name, email, payRange]
    );
    console.log('User details saved successfully!', result);
    return result.lastInsertRowId; // Return the ID of the inserted row
  } catch (error) {
    console.error('Error saving user details:', error);
  }
};

export default function HomeScreen() {
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [payRange, setPayRange] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);

  const opacityWelcome = useRef(new Animated.Value(0)).current;
  const opacityContent = useRef(new Animated.Value(0)).current;
  const opacityHeader = useRef(new Animated.Value(0)).current;
  const opacitySummary = useRef(new Animated.Value(0)).current;
  const opacityBotInfo = useRef(new Animated.Value(0)).current;
  const opacityTransactionInfo = useRef(new Animated.Value(0)).current;
  const opacitySettingsInfo = useRef(new Animated.Value(0)).current;

  const bulbScale = useRef(new Animated.Value(1)).current;
  const chatScale = useRef(new Animated.Value(1)).current;
  const walletScale = useRef(new Animated.Value(1)).current;
  const settingsScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Set up the database when component mounts
    setupDatabaseAsync();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityWelcome, {
        toValue: 1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityWelcome, {
        toValue: 0,
        duration: 400,
        delay: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityContent, {
        toValue: 1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityContent, {
        toValue: 0,
        duration: 500,
        delay: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowFormModal(true);
    });
  }, []);

  useEffect(() => {
    if (isFormFilled) {
      Animated.parallel([
        Animated.timing(opacityHeader, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacitySummary, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityBotInfo, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityTransactionInfo, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacitySettingsInfo, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFormFilled]);

  const handleFormSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !payRange) {
      alert('Please fill out all fields');
    } else if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
    } else {
      await saveUserDetailsAsync(name, email, payRange); // Save to database
      setIsFormFilled(true); // Mark form as filled
      setShowFormModal(false); // Hide the form modal
    }
  };

  const animateIcon = (scaleValue) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Modal visible={showFormModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Your Details</Text>
          <Text style={styles.additionalText}>
            Please provide your name, email, and pay range to get started with the app. This information helps us personalize your experience.
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pay Range:</Text>
            <View style={styles.payRangeContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.payInput}
                placeholder="0"
                value={payRange}
                onChangeText={(text) => setPayRange(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Button title="Submit" onPress={handleFormSubmit} color="#FF6500" />
        </View>
      </Modal>

      {isFormFilled && (
        <View style={styles.mainContent}>
          <Animated.View style={[styles.header, { opacity: opacityHeader }]}>
            <TouchableWithoutFeedback onPress={() => animateIcon(bulbScale)}>
              <Animated.View style={{ transform: [{ scale: bulbScale }] }}>
                <Icon name="bulb-outline" size={40} color="#FF6500" />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text style={styles.headerText}>AI-Financial App</Text>
          </Animated.View>

          <Animated.View style={[styles.summaryContainer, { opacity: opacitySummary }]}>
            <Text style={styles.summaryText}>
              I’m an AI-powered finance app designed to simplify your financial management.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.botInfoContainer, { opacity: opacityBotInfo }]}>
            <TouchableWithoutFeedback onPress={() => animateIcon(chatScale)}>
              <Animated.View style={{ transform: [{ scale: chatScale }] }}>
                <Icon name="chatbubble-ellipses-outline" size={40} color="#FF6500" />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text style={styles.botInfoText}>
              My AI bot is your personal financial assistant, here to provide real-time insights and answer any questions.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.transactionInfoContainer, { opacity: opacityTransactionInfo }]}>
            <TouchableWithoutFeedback onPress={() => animateIcon(walletScale)}>
              <Animated.View style={{ transform: [{ scale: walletScale }] }}>
                <Icon name="wallet-outline" size={40} color="#FF6500" />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text style={styles.transactionInfoText}>
              The Transaction section lets you manage all your financial transactions with ease.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.settingsInfoContainer, { opacity: opacitySettingsInfo }]}>
            <TouchableWithoutFeedback onPress={() => animateIcon(settingsScale)}>
              <Animated.View style={{ transform: [{ scale: settingsScale }] }}>
                <Icon name="settings-outline" size={40} color="#FF6500" />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text style={styles.settingsInfoText}>
              Update your preferences, security, and notification settings in the Settings section.
            </Text>
          </Animated.View>
        </View>
      )}

      <Animated.View style={[styles.textContainer, { opacity: opacityWelcome }]}>
        <Text style={styles.text}>Welcome to AI-Financial App</Text>
      </Animated.View>

      <Animated.View style={[styles.textContainer, { opacity: opacityContent }]}>
        <Text style={styles.text}>Your Smart Financial Assistant</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingTop: 40,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  payRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingLeft: 8,
  },
  dollarSign: {
    fontSize: 16,
    color: '#333',
  },
  payInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  summaryContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  botInfoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  botInfoText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  transactionInfoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  transactionInfoText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  settingsInfoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  settingsInfoText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  additionalText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});
