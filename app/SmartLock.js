//SMART LOCK!!

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const LockImageExample = () => {
  const navigation = useNavigation(); // Access navigation using useNavigation()

  // State to track whether the lock is locked or unlocked
  const [isLocked, setIsLocked] = useState(true);

  // Function to toggle the state
  const toggleLock = () => {
    if (isLocked) {
      // Show an alert confirmation before unlocking
      Alert.alert(
        "Unlock Bike",
        "Are you sure you want to unlock the bike?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes", onPress: () => setIsLocked(false)
          }
        ]
      );
    } else {
      setIsLocked(true); // Lock the bike without confirmation
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleLock} style={styles.imageContainer}>
        <Image
          source={
            isLocked
              ? require('../assets/images/Lock.png') // Path to your lock image
              : require('../assets/images/Unlock.png') // Path to your unlock image
          }
          style={styles.image}
        />
      </TouchableOpacity>

      {/* Conditional text based on the lock state */}
      <Text style={styles.mainText}>
        {isLocked
          ? 'The bicycle is now locked! TAP THE LOCK ICON TO UNLOCK.'
          : 'The bicycle is unlocked! TAP THE UNLOCK ICON TO LOCK.'}
      </Text>

      {/* Footer Navigation */}
      <View style={styles.iconRowBelow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Rent')}>
          <Image source={require('../assets/images/HomeIcon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentHistory')}>
          <Image source={require('../assets/images/HistoryIcon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentNotify')}>
          <Image source={require('../assets/images/NotificationsIcon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentAccount')}>
          <Image source={require('../assets/images/AccountIcon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Account</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',  // Centers content horizontally
    padding: 20,
    backgroundColor: '#D6D6CA'
  },
  imageContainer: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,  // Rounded circle for the image container
    marginBottom: 15,  // Added margin below the image for the text
  },
  image: {
    width: 100,
    height: 100,  // Size of the lock/unlock image
    alignItems: 'center',
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 20,  // Added margin for better text spacing
  },
  iconRowBelow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D6D6CA',
    padding: 10,
    width: "120%",
    position: 'absolute',
    bottom: 0,
    height: 70,
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  iconImage: {
    width: 40, // or the size you want
    height: 40, // or the size you want
  },
});

export default LockImageExample;
