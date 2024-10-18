// LOGIN ACCOUNT


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getUser } from './userDatabase';  // Ensure this points to your userDatabase file
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your desired icon library

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    const { username, password } = loginData;

    // Fetch the user from the "database"
    const user = await getUser(username, password);

    if (user) {
      setError('');
      console.log(`User ${username} logged in successfully.`); // Log success message to terminal
      navigation.navigate('Rent');  // Replace 'Rent' with your desired screen name
    } else {
      setError('Invalid username or password');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Image
          source={require('../assets/images/BackButton.png')} // Adjust the path as necessary
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <Image
        source={require('../assets/images/rentalbike.png')} // Update the path based on your folder structure
        style={styles.image}
      />
      <Text style={styles.header}>Sign in to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={loginData.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={loginData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
          <Icon 
            name={showPassword ? 'visibility' : 'visibility-off'} 
            size={25} 
            color="black" 
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
          <Text style={styles.text}>
            Forget your password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6CA',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  backButtonImage: {
    width: 35,
    height: 30,
  },
  image: {
    width: 230,
    height: 242,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  header: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    width: 300,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 40,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 20,
  },
  iconContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: '#355E3B',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 150,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: -30,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 30,
    textAlign: 'justify',
    fontWeight: '500',
    marginTop: 50,
  },
});

export default LoginForm;
