 // REGISTER ACCOUNT !!
 
import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import googleIcon from '../assets/images/Google.png';
import SignUpIcon from '../assets/images/sign-in.png';


const YourComponent = () => {
  const navigation = useNavigation();
  const [isPressedButton1, setIsPressedButton1] = useState(false);
  const [isPressedButton2, setIsPressedButton2] = useState(false);
  

  return (
    <View style={styles.container}>
      {/* Add Image here */}
      <Image
      source={require('../assets/images/rentalbike.png')} // Update the path based on your folder structure
        style={styles.image}
      />
      {/* Title below the image */}
      <Text style={styles.title}>REGISTER / SIGN IN</Text>
      <View style={styles.textContainer}>
       
      </View>
      <StatusBar style='auto' />

      <TouchableOpacity
      style={[styles.buttonContainer, isPressedButton1 && styles.buttonPressed]}
      onPressIn={() => setIsPressedButton1(true)}
      onPressOut={() => setIsPressedButton1(false)}
      onPress={() => navigation.navigate('')}
    >
      <Image source={googleIcon} style={styles.icon} />
      <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={[styles.buttonContainer, isPressedButton2 && styles.buttonPressed]}
      onPressIn={() => setIsPressedButton2(true)}
      onPressOut={() => setIsPressedButton2(false)}
      onPress={() => navigation.navigate('SignUp')}
    >
      <Image source={SignUpIcon} style={styles.icon} />
      <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate ('LoginAcc')}>
      <Text style={styles.text}>
         already have an account?
       </Text>
        </TouchableOpacity>
      
    </View>
  );
};

export default YourComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    padding: 0,
    backgroundColor: '#D6D6CA',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 230, // Set your desired width
    height: 242, // Set your desired height
    alignSelf: 'center', // Center the image
    marginTop: 30,
    justifyContent: "flex-start",
    marginBottom: 20,
   
  }, title: {
    fontSize: 24, // Set your desired font size for the title
    fontWeight: 'bold', // Make the title bold
    textAlign: 'center', // Center the title
    marginBottom: 10, // Space between title and text
    
  },
  
  icon: {
    width: 20, // Set width for the image
    height: 20, // Set height for the image
    marginRight:20, // Space between the icon and text
    marginLeft: 20,
    alignItems:'center',
  },
  buttonContainer: {
    borderColor: '355E3B',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#355E3B',
    marginBottom: 10,
    width: 300,
    marginTop: -70,
    marginBottom: 50,
    textAlign: 'center'
  },
 
  buttonPressed: {
    backgroundColor: '#355E3B',
    borderColor: '#355E3B',
    transform: [{ scale: 0.95 }],
    
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    
    fontSize: 20,
    color: '#333',
    marginBottom: 30,
    textAlign: 'justify',
    margin:'0',
    padding: '0',
    fontWeight: '500',
  },
  textContainer: {
    marginBottom: 20,
    
  },
});