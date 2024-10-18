 //CHECK ICON!!

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample bike images (replace with actual image imports)
import bike1 from '../assets/images/Bike1.png';
import bike2 from '../assets/images/Bike2.png';
import bike3 from '../assets/images/Bike3.png';
import bike4 from '../assets/images/Bike4.png';
import kBike1 from '../assets/images/kBike1.png';
import kbike2 from '../assets/images/kBike2.png';
import kbike3 from '../assets/images/kBike3.png';
import kbike4 from '../assets/images/kBike4.png';

const bikes = [
  { id: 1, image: bike1, name: 'Japanese bike', price: '₱90.00', available: true },
  { id: 2, image: bike2, name: 'Mountain bike', price: '₱100.00', available: false },
  { id: 3, image: bike3, name: 'Mountain bike', price: '₱100.00', available: true },
  { id: 4, image: bike4, name: 'Road bike', price: '₱100.00', available: false },
  { id: 5, image: kBike1, name: 'HC-BMX-041', price: '₱100.00', available: true },
  { id: 6, image: kbike2, name: 'HC-BMX-042', price: '₱100.00', available: true },
  { id: 7, image: kbike3, name: 'HC-BMX-025', price: '₱100.00', available: false },
  { id: 8, image: kbike4, name: 'HC-BMX-70', price: '₱100.00', available: true },
];

const AvailableBike = () => {
  const navigation = useNavigation(); // Hook to use navigation

  const renderBike = ({ item }) => (
    <View style={[styles.bikeContainer, !item.available && styles.unavailableBike]}>
      <Image source={item.image} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>{item.price}</Text>
      {!item.available && <Text style={styles.unavailableText}>RENTED</Text>}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bikes}
        renderItem={renderBike}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

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
  listContainer: {
  
    marginTop: -5,
    backgroundColor: '#D6D6CA',
  },
  bikeContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 20,
    backgroundColor: '#D6D6CA',
    elevation: 5,
  },
  bikeImage: {
    width: 140,
    height: 100,
    marginBottom: 10,
    marginTop: 10,
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bikePrice: {
    fontSize: 14,
    color: '#888',
  },
  unavailableBike: {
    opacity: 0.5, // Make the bike appear grayed out
  },
  unavailableText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
iconRowBelow: {
    flexDirection: 'row',
    justifyContent:'space-around',

    backgroundColor: '#D6D6CA',
    padding: 1, // Optional: add padding inside the border
    width: "100%",
    marginTop: -5,
    marginBottom: 5,
   
  

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
    // additional styles if needed...
    marginTop: 10,
  },
});

export default AvailableBike;

 