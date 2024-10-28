import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I assist you today?', isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { id: String(messages.length + 1), text: inputMessage, isBot: false };
      setMessages([...messages, newMessage]);
      setInputMessage(''); // Clear input field after sending
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isBot ? styles.botMessage : styles.userMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Ionicons size={40} name="chatbubbles" style={styles.icon} />
        <ThemedText type="title">Chatbot</ThemedText>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        contentContainerStyle={{ paddingBottom: 80 }} // Padding for input field
      />

      {/* Message Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
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
  chatArea: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
    maxWidth: '80%',
  },
  botMessage: {
    backgroundColor: '#e6e6e6',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
