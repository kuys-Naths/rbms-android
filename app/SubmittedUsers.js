// WALA NA RIN SILBE 'TO

import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getAllUsers } from './userDatabase';  // Import from userDatabase
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SubmittedUsersScreen = () => {
  const navigation = useNavigation();
  const users = getAllUsers();  // Get all users from the simulated database

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('LoginAcc')} // 'RegisterAcc' is the name of the target screen
        >
        <Ionicons name="person" size={40} color="green" />
        <Text style={styles.iconText}>Accounts</Text>
        </TouchableOpacity>
      <Text style={styles.header}>Submitted Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>Name: {item.name}</Text>
            <Text style={styles.userText}>Email: {item.email}</Text>
            <Text style={styles.userText}>Username: {item.username}</Text>
            <Text style={styles.userText}>Address: {item.address}</Text>
            <Text style={styles.userText}>Terms Accepted: {item.termsAccepted ? "Yes" : "No"}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  userItem: {
    backgroundColor: '#eaeaea',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  userText: {
    color: '#333',
  },
});

export default SubmittedUsersScreen;
