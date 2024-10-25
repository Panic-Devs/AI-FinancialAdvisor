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

  useEffect(() => {
    // Start the animation for the header when the component mounts
    Animated.timing(translateYHeader, {
      toValue: -200, // Move the header upwards
      duration: 1000, // Duration of the animation in ms
      easing: Easing.inOut(Easing.ease), // Easing function for smooth transition
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => {
      // After the header animation finishes, animate the description
      Animated.parallel([
        Animated.timing(translateYDescription, {
          toValue: -200, // Move the description upwards
          duration: 1000, // Duration for the description movement
          easing: Easing.inOut(Easing.ease), // Smooth transition
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(opacityDescription, {
          toValue: 1, // Fully visible
          duration: 1000, // Duration for the fade-in effect
          easing: Easing.inOut(Easing.ease), // Easing function for smooth transition
          useNativeDriver: true, // Use native driver for better performance
        }),
      ]).start(() => {
        // Animate the chatbot section after the description
        Animated.parallel([
          Animated.timing(translateYChatbot, {
            toValue: -200, // Move the chatbot icon upwards
            duration: 1000, // Duration for the movement
            easing: Easing.inOut(Easing.ease), // Smooth transition
            useNativeDriver: true, // Use native driver for better performance
          }),
          Animated.timing(opacityChatbot, {
            toValue: 1, // Fully visible
            duration: 1000, // Duration for the fade-in effect
            easing: Easing.inOut(Easing.ease), // Easing function for smooth transition
            useNativeDriver: true, // Use native driver for better performance
          }),
        ]).start();
      });
    });
  }, [translateYHeader, translateYDescription, opacityDescription, translateYChatbot, opacityChatbot]);

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
            Why They Call Me AI - Financial ChatBot?
          </ThemedText>
        </View>
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
    backgroundColor: '#353A3A',
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
    marginTop: 40, // Space between sections
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center',
  },
  chatbotHeading: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10, // Space between icon and text
  },
});
