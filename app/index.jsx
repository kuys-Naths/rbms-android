// Eto yung page ng Privacy are Valued, MOBILE APP

import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const YourComponent = () => {
  const navigation = useNavigation();
  const [isPressedButton1, setIsPressedButton1] = useState(false);
  const [isPressedButton2, setIsPressedButton2] = useState(false);
  

  return (
    <View style={styles.container}>
      {/* Add Image here */}
      <Image
      source={require('../assets/images/privacy.png')} // Eto yung images
        style={styles.image}
      />
      {/* Title below the image */}
      <Text style={styles.title}>Your Privacy are Valued</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Our website uses cookies that are essential for its operation. 
          You agree to us also using ananalytical, functional, and targeting cookies that allow us to improve our website, 
          personalize content, and show you relevant adverts (both on and off our website and app). 
          Please accept and continue. If you do not agree or would like to change preferences, 
          you can manage your cookie settings.
        </Text>
      </View>
      <StatusBar style='auto' />

      {/* Homepage.js */}
      <TouchableOpacity
        style={[styles.buttonContainer, isPressedButton1 && styles.buttonPressed]}
        onPressIn={() => setIsPressedButton1(true)}
        onPressOut={() => setIsPressedButton1(false)}
        onPress={() => navigation.navigate('Homepage')}
      >
        <Text style={styles.buttonText}>Accept and Continue</Text> 
      </TouchableOpacity>

      {/* N/A */}
      <TouchableOpacity
        style={[styles.buttonContainer, isPressedButton2 && styles.buttonPressed]}
        onPressIn={() => setIsPressedButton2(true)}
        onPressOut={() => setIsPressedButton2(false)}
        onPress={() => navigation.navigate('settings')}
      >
        <Text style={styles.buttonText}>Manage cookie Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default YourComponent;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 70,
    backgroundColor: '#D6D6CA',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: 100, // Set your desired width
    height: 100, // Set your desired height
    alignSelf: 'center', // Center the image
    marginBottom: 20, // Space between image and text
    marginTop: 100,
  }, title: {
    fontSize: 24, // Set your desired font size for the title
    fontWeight: 'bold', // Make the title bold
    textAlign: 'center', // Center the title
    marginBottom: 10, // Space between title and text
  },
  
  text: {
    
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    textAlign: 'justify',
    margin:'0',
    padding: '0',
    
  },
  textContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    borderColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'green',
    marginBottom: 20,
    width: 300,
  },
  buttonPressed: {
    backgroundColor: '#355E3B',
    borderColor: '#355E3B',
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});