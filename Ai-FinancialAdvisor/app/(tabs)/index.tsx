import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const opacityWelcome = useRef(new Animated.Value(0)).current;
  const opacityContent = useRef(new Animated.Value(0)).current;
  const opacityHeader = useRef(new Animated.Value(0)).current;
  const opacitySummary = useRef(new Animated.Value(0)).current;
  const opacityBotInfo = useRef(new Animated.Value(0)).current;
  const opacityTransactionInfo = useRef(new Animated.Value(0)).current;

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
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: opacityHeader }]}>
        <Icon name="bulb-outline" size={40} color="#FF6500" />
        <Text style={styles.headerText}>AI-Finance App</Text>
      </Animated.View>

      <Animated.View style={[styles.summaryContainer, { opacity: opacitySummary }]}>
        <Text style={styles.summaryText}>
          I’m an AI-powered finance app designed to help you manage your financial needs seamlessly. Track your transactions, organize your money, and get personalized insights by interacting with my AI bot. Just ask, and I'll assist with your financial questions!
        </Text>
      </Animated.View>

      {/* AI Bot Section */}
      <Animated.View style={[styles.botInfoContainer, { opacity: opacityBotInfo }]}>
        <Icon name="chatbubble-ellipses-outline" size={40} color="#FF6500" style={styles.botIcon} />
        <Text style={styles.botInfoText}>
          My AI bot is here to provide real-time financial insights, answer questions about your spending habits, and offer budgeting tips tailored to your needs. Simply ask, and I’ll guide you through making better financial decisions.
        </Text>
      </Animated.View>

      {/* Transaction Section */}
      <Animated.View style={[styles.transactionInfoContainer, { opacity: opacityTransactionInfo }]}>
        <Icon name="wallet-outline" size={40} color="#FF6500" style={styles.transactionIcon} />
        <Text style={styles.transactionInfoText}>
          Inside the Transaction section, you can manage and organize your financial transactions based on your unique needs. With the help of my AI bot, adding and tracking your transactions becomes seamless and personalized to your financial goals.
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
    backgroundColor: '#0B192C',
    paddingTop: 40,
  },
  header: {
    width: '100%',
    backgroundColor: '#1E3E62',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
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
  botIcon: {
    marginBottom: 10,
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
  transactionIcon: {
    marginBottom: 10,
  },
  transactionInfoText: {
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
