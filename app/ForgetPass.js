//FORGET PASSWORD!!

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed
import { resetPassword } from './userDatabase'; 

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password visibility

  const inputRefs = useRef([]);
  const navigation = useNavigation();

  const handleRequestCode = async () => {
    try {
      const response = await fetch('http://192.168.1.2:5001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Password Reset Code',
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to send email. Please try again.');
      }

      Alert.alert('Success', 'Verification code sent to your email.');
      setStep(2);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit verification code.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.2:5001/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Invalid or expired verification code.');
      }

      Alert.alert('Success', 'Verification code verified. Please set a new password.');
      setStep(3);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please try again.');
      return;
    }

    try {
      await resetPassword(username, newPassword);
      Alert.alert('Success', 'Password has been reset successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('LoginAcc'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text.replace(/[^0-9]/g, ''); // Only allow digits
    setVerificationCode(newCode);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus(); // Move to the next input box
    }
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus(); // Move to the previous input box
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.header}>Forgot Password</Text>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleRequestCode}>
            <Text style={styles.buttonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.stepHeader}>VERIFICATION</Text>
          <Text style={styles.label}>INPUT CODE</Text>

          <View style={styles.verificationContainer}>
            {verificationCode.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                style={styles.verificationInput}
                maxLength={1}
                keyboardType="numeric"
                ref={(el) => (inputRefs.current[index] = el)}
                accessibilityLabel={`Verification digit ${index + 1}`}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.stepHeader}>Reset Password</Text>

          {/* New Password Field with Eye Icon */}
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Type you new password:</Text>
            <TextInput
              placeholder="New Password"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.inputWithIcon}
            />
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={25}
              marginTop = {15}
              color="black"
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconInsideInput}
            />
          </View>

          {/* Confirm Password Field with Eye Icon */}
          <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm password:</Text>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.inputWithIcon}
            />
            <Icon
              name={showConfirmPassword ? 'visibility' : 'visibility-off'}
              size={25}
              marginTop = {15}
              color="black"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.iconInsideInput}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D6D6CA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  stepHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },
  verificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  verificationInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#355E3B',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  inputWithIcon: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    paddingRight: 40, // Make space for the icon
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },
  iconInsideInput: {
    position: 'absolute',
    right: 10,
    top: '30%',
  },
});

export default ForgotPassword;
