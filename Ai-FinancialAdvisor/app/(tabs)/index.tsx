import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Easing, View, Text, TextInput, Button, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const [isFormFilled, setIsFormFilled] = useState(false); // Track if form is filled
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [payRange, setPayRange] = useState('');
  const [showFormModal, setShowFormModal] = useState(false); // Initially hide the form modal

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
      setShowFormModal(true); // Show the form modal after the first two animations
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

  const handleFormSubmit = () => {
    if (name && email && payRange) {
      setIsFormFilled(true);
      setShowFormModal(false);
    } else {
      alert('Please fill out all fields');
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
      {/* Form Modal */}
      <Modal visible={showFormModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Your Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Pay Range"
            value={payRange}
            onChangeText={setPayRange}
          />
          <Button title="Submit" onPress={handleFormSubmit} color="#FF6500" />
        </View>
      </Modal>

      {/* Main Content */}
      {isFormFilled && (
        <>
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
              I’m an AI-powered finance app designed to help you manage your financial needs seamlessly. Track your transactions, organize your money, and get personalized insights by interacting with my AI bot.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.botInfoContainer, { opacity: opacityBotInfo }]}>
            <TouchableWithoutFeedback onPress={() => animateIcon(chatScale)}>
              <Animated.View style={{ transform: [{ scale: chatScale }] }}>
                <Icon name="chatbubble-ellipses-outline" size={40} color="#FF6500" />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text style={styles.botInfoText}>
              My AI bot is here to provide real-time financial insights and answer questions tailored to your needs.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.transactionInfoContainer, { opacity: opacityTransactionInfo }]}>
            <TouchableWithoutFeedback onPress={() => animateIcon(walletScale)}>
              <Animated.View style={{ transform: [{ scale: walletScale }] }}>
                <Icon name="wallet-outline" size={40} color="#FF6500" />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Text style={styles.transactionInfoText}>
              Manage your transactions and track your spending goals in the Transaction section.
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
        </>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingTop: 40,
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
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
    backgroundColor: '#141414',
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  summaryContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  summaryText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  botInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  botInfoText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  transactionInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  transactionInfoText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  settingsInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
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
});
