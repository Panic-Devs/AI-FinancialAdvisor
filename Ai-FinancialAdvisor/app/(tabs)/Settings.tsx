import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Switch, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabThreeScreen() {
  // State for toggles
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  return (
    <ThemedView style={styles.container}>
      {/* Settings Page Title */}
      <View style={styles.titleContainer}>
        <Ionicons size={40} name="settings" style={styles.icon} />
        <ThemedText type="title">Settings</ThemedText>
      </View>

      {/* General Settings Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>General</ThemedText>
        {/* Notifications Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={isDarkModeEnabled}
            onValueChange={setIsDarkModeEnabled}
          />
        </View>
      </View>

      {/* Account Settings Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>
        {/* Change Password Button */}
        <TouchableOpacity style={styles.settingItem} onPress={() => alert('Change Password')}>
          <Text style={styles.settingLabel}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#808080" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.settingItem} onPress={() => alert('Logged out')}>
          <Text style={styles.settingLabel}>Log Out</Text>
          <Ionicons name="chevron-forward" size={20} color="#808080" />
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 16,
  },
});
