import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Switch, Text, TextInput, Slider } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16);

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

        {/* Name Input */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Salary Range Picker */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Salary Range</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={salaryRange}
              onValueChange={(itemValue) => setSalaryRange(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Salary Range" value="" />
              <Picker.Item label="Below $20,000" value="Below $20,000" />
              <Picker.Item label="$20,000 - $50,000" value="$20,000 - $50,000" />
              <Picker.Item label="$50,000 - $100,000" value="$50,000 - $100,000" />
              <Picker.Item label="Above $100,000" value="Above $100,000" />
            </Picker>
          </View>
        </View>
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

        {/* Font Size Slider */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Font Size</Text>
          <Slider
            style={styles.slider}
            minimumValue={12}
            maximumValue={24}
            step={1}
            value={fontSize}
            onValueChange={setFontSize}
          />
          <Text style={styles.fontSizeLabel}>{fontSize}</Text>
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
  slider: {
    width: '50%',
  },
  fontSizeLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});
