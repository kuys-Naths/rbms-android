// 'CheckBox' eto yung sa terms and condtions!!
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ label, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');

  const handlePress = () => {
    // Toggle checkbox state
    const newCheckedState = !isChecked;
    
    setIsChecked(newCheckedState);
    setError(''); // Clear error when toggled

    if (newCheckedState) {
      // Call the parent handler if provided
      onToggle && onToggle(newCheckedState);
    } else {
      // If unchecked, show the error
      setError('You must accept the terms and conditions');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 50,
    borderWidth: 3,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
});

export default Checkbox;
