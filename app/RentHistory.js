// RENT HISTORY 
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const newBookingDetails = route.params?.bookingDetails;
    if (newBookingDetails) {
      const newBooking = {
        id: newBookingDetails.reservationNumber.toString(), // Using reservation number as ID
        bookingNumber: newBookingDetails.reservationNumber.toString(), // Make sure this is a string
        date: new Date().toLocaleDateString(),
        title: newBookingDetails.bikeName,
        price: newBookingDetails.bikePrice,
        Cnumber: newBookingDetails.userDetails.contactNo,
        image: newBookingDetails.bikeImage,
      };
      saveBooking(newBooking);
    }
    loadBookings();
  }, [route.params]);

  const saveBooking = async (newBooking) => {
    try {
      const existingBookings = await AsyncStorage.getItem('bookingData');
      const bookingArray = existingBookings ? JSON.parse(existingBookings) : [];
      // Ensure the bookingNumber is treated as a string
      newBooking.bookingNumber = newBooking.bookingNumber.toString(); // Convert bookingNumber to string
      bookingArray.push(newBooking);
      await AsyncStorage.setItem('bookingData', JSON.stringify(bookingArray));
      setBookingData(bookingArray);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const loadBookings = async () => {
    try {
      const existingBookings = await AsyncStorage.getItem('bookingData');
      if (existingBookings) {
        setBookingData(JSON.parse(existingBookings));
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('bookingData');
      setBookingData([]);
      Alert.alert('Success', 'Booking history cleared.');
    } catch (error) {
      console.error('Error clearing booking history:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.count}>{item.Cnumber}</Text>
        <Text style={styles.reservationNumber}>Reservation #: {item.bookingNumber}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Clear History Button */}
      <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>

      {bookingData.length === 0 ? (
        <Text style={styles.emptyMessage}>No booking history available.</Text>
      ) : (
        <FlatList
          data={bookingData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      {/* Footer Navigation */}
      <View style={styles.iconRowBelow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Rent')}>
          <Image source={require('../assets/images/HomeIcon.png')} style={[styles.iconImage, { tintColor: 'gray' }]} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentHistory')}>
          <Image source={require('../assets/images/HistoryIcon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentNotify')}>
          <Image source={require('../assets/images/NotificationsIcon.png')} style={[styles.iconImage, { tintColor: 'gray' }]} />
          <Text style={styles.iconText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentAccount')}>
          <Image source={require('../assets/images/AccountIcon.png')} style={[styles.iconImage, { tintColor: 'gray' }]} />
          <Text style={styles.iconText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#D6D6CA',
  },
  bookingItem: {
    flexDirection: 'row',
    backgroundColor: '#D6D6CA',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#555',
  },
  count: {
    fontSize: 14,
    color: '#888',
  },
  reservationNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  iconRowBelow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D6D6CA',
    padding: 1,
    width: '100%',
    marginTop: 10,
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
    width: 40,
    height: 40,
  },
});

export default BookingHistory; 