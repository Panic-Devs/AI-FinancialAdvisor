import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const translateYHeader = useRef(new Animated.Value(0)).current;
  const translateYDescription = useRef(new Animated.Value(50)).current;
  const opacityDescription = useRef(new Animated.Value(0)).current;
  const translateYChatbot = useRef(new Animated.Value(50)).current;
  const opacityChatbot = useRef(new Animated.Value(0)).current;
  const translateYTransaction = useRef(new Animated.Value(50)).current;
  const opacityTransaction = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("Animations starting...");

    Animated.timing(translateYHeader, {
      toValue: -270,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      console.log("Header animation complete");

      Animated.parallel([
        Animated.timing(translateYDescription, {
          toValue: -250,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityDescription, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        console.log("Description animation complete");

        Animated.parallel([
          Animated.timing(translateYChatbot, {
            toValue: -230,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityChatbot, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => {
          console.log("Chatbot animation complete");

          Animated.parallel([
            Animated.timing(translateYTransaction, {
              toValue: -210,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(opacityTransaction, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]).start(() => console.log("Transaction animation complete"));
        });
      });
    });
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: translateYHeader }] }}>
        <View style={styles.header}>
          <Icon name="cash-outline" size={30} color="#FFFFFF" style={styles.icon} />
          <ThemedText style={styles.headerText}>Welcome To AI - Financial App</ThemedText>
        </View>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: translateYDescription }], opacity: opacityDescription }}>
        <ThemedText style={styles.description}>
          I am an AI-based financial tool designed to make your financial life easy. Our chatbot helps you manage transactions effortlessly. You can ask any questions to the chatbot and save your transactions in the transaction history.
        </ThemedText>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: translateYChatbot }], opacity: opacityChatbot }}>
        <View style={styles.chatbotSection}>
          <Icon name="chatbox-ellipses-outline" size={60} color="#FFFFFF" />
          <ThemedText style={styles.chatbotHeading}>
            Our AI Finance Chatbot
          </ThemedText>
        </View>
        <ThemedText style={styles.chatbotDescription}>
          I can manage your transactions and advise you on your financial needs. To ask me something, click on the icon.
        </ThemedText>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: translateYTransaction }], opacity: opacityTransaction }}>
        <View style={styles.transactionSection}>
          <Icon name="wallet-outline" size={60} color="#FFFFFF" />
          <ThemedText style={styles.transactionHeading}>
            Transaction Management
          </ThemedText>
        </View>
        <ThemedText style={styles.transactionDescription}>
          Track and review your transaction history easily. Click on the icon to view your transactions.
        </ThemedText>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(53, 58, 58, 0.8)', // Semi-transparent background for readability
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#C3BCC2',
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  chatbotSection: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatbotHeading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  chatbotDescription: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  transactionSection: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionHeading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  transactionDescription: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
});
