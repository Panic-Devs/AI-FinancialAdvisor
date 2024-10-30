import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing, View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const opacityWelcome = useRef(new Animated.Value(0)).current;
  const opacityContent = useRef(new Animated.Value(0)).current;
  const opacityHeader = useRef(new Animated.Value(0)).current;
  const opacitySummary = useRef(new Animated.Value(0)).current;
  const opacityBotInfo = useRef(new Animated.Value(0)).current;
  const opacityTransactionInfo = useRef(new Animated.Value(0)).current;
  const opacitySettingsInfo = useRef(new Animated.Value(0)).current;

  // Animated values for icons
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
      ]),
    ]).start();
  }, []);

  // Function to animate the icon when clicked
  const animateIcon = (scaleValue) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5, // Scale up
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1, // Scale back down
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
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
          I’m an AI-powered finance app designed to help you manage your financial needs seamlessly. Track your transactions, organize your money, and get personalized insights by interacting with my AI bot. Just ask, and I'll assist with your financial questions!
        </Text>
      </Animated.View>

      {/* AI Bot Section */}
      <Animated.View style={[styles.botInfoContainer, { opacity: opacityBotInfo }]}>
        <TouchableWithoutFeedback onPress={() => animateIcon(chatScale)}>
          <Animated.View style={{ transform: [{ scale: chatScale }] }}>
            <Icon name="chatbubble-ellipses-outline" size={40} color="#FF6500" style={styles.botIcon} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Text style={styles.botInfoText}>
          My AI bot is here to provide real-time financial insights, answer questions about your spending habits, and offer budgeting tips tailored to your needs. Simply ask, and I’ll guide you through making better financial decisions.
        </Text>
      </Animated.View>

      {/* Transaction Section */}
      <Animated.View style={[styles.transactionInfoContainer, { opacity: opacityTransactionInfo }]}>
        <TouchableWithoutFeedback onPress={() => animateIcon(walletScale)}>
          <Animated.View style={{ transform: [{ scale: walletScale }] }}>
            <Icon name="wallet-outline" size={40} color="#FF6500" style={styles.transactionIcon} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Text style={styles.transactionInfoText}>
          Inside the Transaction section, you can manage and organize your financial transactions based on your unique needs. With the help of my AI bot, adding and tracking your transactions becomes seamless and personalized to your financial goals.
        </Text>
      </Animated.View>

      {/* Settings Section */}
      <Animated.View style={[styles.settingsInfoContainer, { opacity: opacitySettingsInfo }]}>
        <TouchableWithoutFeedback onPress={() => animateIcon(settingsScale)}>
          <Animated.View style={{ transform: [{ scale: settingsScale }] }}>
            <Icon name="settings-outline" size={40} color="#FF6500" style={styles.settingsIcon} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Text style={styles.settingsInfoText}>
          Manage your account preferences here. Update your profile information, adjust notification settings, and configure security options to personalize your experience.
        </Text>
      </Animated.View>

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
    backgroundColor: '#000000', // Black background
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
    backgroundColor: '#141414', // Slightly lighter for contrast
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White for contrast
    marginLeft: 12,
  },
  summaryContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  summaryText: {
    fontSize: 16,
    color: '#FFFFFF', // White for better readability
    textAlign: 'center',
  },
  botInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  botIcon: {
    marginBottom: 10,
  },
  botInfoText: {
    fontSize: 16,
    color: '#FFFFFF', // White for better readability
    textAlign: 'center',
  },
  transactionInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  transactionIcon: {
    marginBottom: 10,
  },
  transactionInfoText: {
    fontSize: 16,
    color: '#FFFFFF', // White for better readability
    textAlign: 'center',
  },
  settingsInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  settingsIcon: {
    marginBottom: 10,
  },
  settingsInfoText: {
    fontSize: 16,
    color: '#FFFFFF', // White for better readability
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
    color: '#FFFFFF', // White for contrast
  },
});
