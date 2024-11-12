import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Switch, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
  // State variables
  const [name, setName] = useState('John Doe');  // Placeholder for fetched data
  const [email, setEmail] = useState('johndoe@example.com');  // Placeholder for fetched data
  const [salaryRange, setSalaryRange] = useState('$20,000 - $50,000');  // Placeholder for fetched data
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // Toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ThemedView style={styles.container}>
      {/* Settings Page Title */}
      <View style={styles.titleContainer}>
        <Ionicons size={40} name="settings" style={styles.icon} />
        <ThemedText type="title">Settings</ThemedText>
      </View>

      {/* Account Settings Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>

        {/* Name Field */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.valueText}>{name}</Text>
          )}
        </View>

        {/* Email Field */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.valueText}>{email}</Text>
          )}
        </View>

        {/* Salary Range Field */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Salary Range</Text>
          {isEditing ? (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={salaryRange}
                onValueChange={(itemValue) => setSalaryRange(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Below $20,000" value="Below $20,000" />
                <Picker.Item label="$20,000 - $50,000" value="$20,000 - $50,000" />
                <Picker.Item label="$50,000 - $100,000" value="$50,000 - $100,000" />
                <Picker.Item label="Above $100,000" value="Above $100,000" />
              </Picker>
            </View>
          ) : (
            <Text style={styles.valueText}>{salaryRange}</Text>
          )}
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      {/* Display Settings Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Display</ThemedText>

        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={isDarkModeEnabled}
            onValueChange={setIsDarkModeEnabled}
          />
        </View>

        {/* Font Size Picker */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Font Size</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fontSize}
              onValueChange={setFontSize}
              style={styles.picker}
            >
              <Picker.Item label="Small (12)" value={12} />
              <Picker.Item label="Medium (16)" value={16} />
              <Picker.Item label="Large (20)" value={20} />
              <Picker.Item label="Extra Large (24)" value={24} />
            </Picker>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Adjust based on theme
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    width: '60%',
  },
  valueText: {
    fontSize: 16,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '60%',
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  editButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
