// ACCOUNT!!

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfilePage = ({ route }) => {
  const navigation = useNavigation();

  // Placeholder data, replace with actual user data
  const user = route?.params?.user || {
    name: 'Mariella Angelica A. Fernandez',
    email: 'mariellaa**********andez29@gmail.com',
    address: 'San Jose, Rodriguez, Rizal',
    dateOfBirth: 'December 29, 2002',
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData'); // Clear user data on logout
      navigation.navigate('Homepage');
      BackHandler.exitApp(); // Close the app
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleResetPass = () => {
    navigation.navigate('ForgetPass'); // Navigate to reset password screen
  };

  const deleteAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteUser(user.username); // Pass the username to delete
              await AsyncStorage.removeItem('userData'); // Clear user data
              navigation.navigate('Homepage'); // Navigate to the homepage
              Alert.alert("Account Deleted", "Your account has been successfully deleted.");
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert("Error", error.message || "Failed to delete account."); // Show error message
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#355E3B', '#5F8575', '#D6D6CA']}
        style={{
          alignItems: 'center',
          width: "100%",
          padding: 10,
          borderRadius: 5,
          marginTop: -10,
        }}
      >
        <View style={styles.profileHeader}>
          <Image source={require('../assets/images/userProfile.png')} style={styles.profileImage} />
          <View>
            <Text style={styles.greeting}>Hi, {user.name.split(' ')[0]}...</Text>
            <Text style={styles.manageAccountText}>Manage My Account</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Account Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account Security</Text>
        <View style={styles.row}>
          <Image source={require('../assets/images/EmailIcon.png')} style={styles.icon} />
          <Text style={styles.textLabel}>Linked Email:</Text>
        </View>
        
        <Text style={styles.userEmail}>{user.email}</Text>

        <View style={styles.row}>
          <Image source={require('../assets/images/ResetPassIcon.png')} style={styles.icon} />
          <Text style={styles.resetPasswordText}>Reset Password</Text>
        </View>

        <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPass}>
          <Text style={styles.resetButtonText}>Set</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountButton} onPress={deleteAccount}>
        <Text style={styles.deleteAccountText}>Delete Account</Text>
      </TouchableOpacity>
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Image source={require('../assets/images/NameIcon.png')} style={styles.icon} />
          <Text style={styles.textLabel}>Name:</Text>
        </View>
        <Text style={styles.textDetail}>{user.name}</Text>

        <View style={styles.row}>
          <Image source={require('../assets/images/AddressIcon.png')} style={styles.icon} />
          <Text style={styles.textLabel}>Address:</Text>
        </View>
        <Text style={styles.textDetail}>{user.address}</Text>

        <View style={styles.row}>
          <Image source={require('../assets/images/BirthdayIcon.png')} style={styles.icon} />
          <Text style={styles.textLabel}>Date of Birth:</Text>
        </View>
        <Text style={styles.textDetail}>{user.dateOfBirth}</Text>
      </View>

      {/* Sign Out and Delete Account */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      
      <Text style={styles.warningText}>
        Once deleted, all account information will be removed. You will not be able to recover this information.
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Terms & Conditions</Text>
        <Text style={styles.footerText}>© 2024 (TITLE)</Text>
      </View>

      {/* Icon Row Below */}
      <View style={styles.iconRowBelow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Rent')}>
          <Image source={require('../assets/images/HomeIcon.png')} style={[styles.iconImage, { tintColor: 'gray' }]} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentHistory')}>
          <Image source={require('../assets/images/HistoryIcon.png')} style={[styles.iconImage, { tintColor: 'gray' }]} />
          <Text style={styles.iconText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentNotify')}>
          <Image source={require('../assets/images/NotificationsIcon.png')} style={[styles.iconImage, { tintColor: 'gray' }]} />
          <Text style={styles.iconText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentAccount')}>
          <Image source={require('../assets/images/AccountIcon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6D6CA',
    alignItems: 'center',
    padding: 0,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  manageAccountText: {
    color: '#000000',
  },
  section: {
    width: '100%',
    backgroundColor: '#D6D6CA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  textDetail: {
    fontSize: 16,
    marginLeft: 34, // Aligns with icon spacing
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 14,
    marginLeft: 34,
    color: '#666',
    marginBottom: 10,
  },
  resetPasswordButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#099654',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: -28,
  },
  resetPasswordText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: '#099654',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
 
  },
  signOutText: {
    color: 'black',
    fontSize: 16,
  },
  deleteAccountButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:20,
    marginTop: 10,
   
  },
  deleteAccountText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  warningText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'black',
  },
  iconRowBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
    marginBottom: 20,
  },
});

export default ProfilePage;
