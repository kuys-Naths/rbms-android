//CREATE ACCOUNT

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {addUser } from './userDatabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your desired icon library

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const navigation = useNavigation();  // Hook to access navigation

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setTermsAccepted((prev) => !prev);
  };

  const handleSubmit = async () => {
    // Check for required fields
    if (!formData.name) {
      setError('Name is required.');
      return;
    }
    if (!formData.email) {
      setError('Email is required.');
      return;
    }

    // Check if email is valid and at least 8 characters in local part
    const emailParts = formData.email.split('@');
    if (emailParts.length !== 2 || emailParts[0].length < 8) {
      setError('Email must be at least 8 characters long before the @ symbol.');
      return;
    }

    // Validate email format (must end with @yahoo.com or @gmail.com)
    const emailPattern = /^[\w-\.]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(formData.email)) {
      setError('Email must be a @gmail.com or @yahoo.com address.');
      return;
    }

    if (!formData.address) {
      setError('Address is required.');
      return;
    }

    if (!formData.username) {
      setError('Username is required.');
      return;
    }
    // Validate username length
    if (formData.username.length < 4) {
      setError('Username must be at least 4 characters long.');
      return;
    }
    // Validate username is not the same as the actual name
    if (formData.username.toLowerCase() === formData.name.toLowerCase()) {
      setError('Username must not be the same as your actual name.');
      return;
    }

    const usernamePattern = /^[a-zA-Z0-9.]+$/; // Letters, numbers, and periods (.) only
    const doublePeriodPattern = /\.\./; // More than one consecutive period
    if (!usernamePattern.test(formData.username)) {
      setError('Username can only contain letters (a-z), numbers (0-9), and periods (.)');
      return;
    } else if (doublePeriodPattern.test(formData.username)) {
      setError('Username cannot contain consecutive periods (..)');
      return;
    }

    // Validate password: must be at least 8 characters, start with a capital letter, and end with 3 digits
    const passwordPattern = /^[A-Z][A-Za-z0-9]{4,}\d{3}$/;
    if (!passwordPattern.test(formData.password)) {
      setError('Password must be at least 8 characters long, start with a capital letter, and end with 3 digits.');
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate terms and conditions are accepted
    if (!termsAccepted) {
      setError("Please accept the terms and conditions.");
      return;
    }

    try {
      // Store user data in the simulated database
      const newUser = { ...formData, termsAccepted };
      
      await addUser(newUser);  // Save to the "database"
      setError('');

      // Optionally reset form data after submission
      setFormData({
        name: '',
        email: '',
        address: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
      setTermsAccepted(false);

      // Navigate to Submitted Users screen
      navigation.navigate('LoginAcc');
    } catch (error) {
      setError(error.message); // Show the error message
      // Redirect to the homepage after displaying the error
      setTimeout(() => {
        navigation.navigate('SignUp'); //it will reload if the user is same name
      }, 10000); // Redirect after 10 seconds
    }
  };

  const handleBack = () => {
    navigation.goBack();  // Navigate back to the previous screen
  };

  // Disable checkbox if required fields are blank
  const isFormIncomplete = !formData.name || !formData.email || !formData.address || !formData.username;

  return (
    <ScrollView style={styles.container}>
     
     
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Juan Dela Cruz"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. juandelacruz@gmail.com"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <Text style={styles.label}>Home Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Quezon City"
        value={formData.address}
        onChangeText={(value) => handleChange('address', value)}
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g Pedro"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      <Text style={styles.label}>Password:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="********"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
          <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={25} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Confirm Password:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="********"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword((prev) => !prev)}>
          <Icon name={showConfirmPassword ? 'visibility' : 'visibility-off'} size={25} color="black" />
        </TouchableOpacity>
      </View>
   
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <CheckBox
        title="Agree to terms & conditions"
        checked={termsAccepted}
        onPress={handleCheckboxChange}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxLabel}
        disabled={isFormIncomplete}  // Disable checkbox if form is incomplete
      />
       

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginAcc')}>
        <Text style={styles.text}>
          already have an account?
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#D6D6CA',
    borderRadius: 10,
    shadowColor: '#000',
    height: '100%',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 1,
    padding: 10,
    borderRadius: 5,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
   
    textAlign:'center'
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginVertical: 5,
    alignItems: 'flex-start',
    
  },
  checkboxLabel: {
    fontWeight: 'bold',

  },
  button: {
    backgroundColor: '#355E3B',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5, 
    width: '50%',
    marginLeft:80,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
});

export default SignUpForm;
