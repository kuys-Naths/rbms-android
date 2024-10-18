//BIKE DETAILS!!

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

// Import your bike images
import bike1 from '../assets/images/Bike1.png';
import bike2 from '../assets/images/Bike2.png';
import bike3 from '../assets/images/Bike3.png';
import bike4 from '../assets/images/Bike4.png';
import kBike1 from '../assets/images/kBike1.png';
import kbike2 from '../assets/images/kBike2.png';
import kbike3 from '../assets/images/kBike3.png';
import kbike4 from '../assets/images/kBike4.png';

const BikeDetails = () => {
  const route = useRoute();
  const { bikeId } = route.params;

  const bikeData = [
    { id: 1, image: bike1, name: 'Japanese Bicycle', price: '₱50.00', available: 5, description: 'Japanese bike typically denotes a motorcycle produced by a major Japanese manufacturer, with connotations of advanced engineering, performance, reliability, and global market presence.' },
    { id: 2, image: bike2, name: 'Mountain Bike', price: '₱50.00', available: 3, description: 'A mountain bike, or "MTB" for short, refers to a specific type of bicycle designed for off-road riding on rough terrain, such as trails, hills, and mountains.' },
    { id: 3, image: bike3, name: 'Mountain Bike', price: '₱50.00', available: 4, description: 'City bikes are designed for comfortable commuting and are equipped with features to make riding in urban environments more enjoyable.' },
    { id: 4, image: bike4, name: 'Road Bike', price: '₱50.00', available: 2, description: 'Road bikes are designed for speed and efficiency on paved roads, featuring lightweight frames and thin tires.' },
    { id: 5, image: kBike1, name: 'HC-BMX-041', price: '₱50.00', available: 5, description: 'Kids bikes without front baskets offer a more streamlined, lightweight, and versatile design.' },
    { id: 6, image: kbike2, name: 'HC-BMX-042', price: '₱50.00', available: 5, description: 'Kids bikes without front baskets offer a more streamlined, lightweight, and versatile design.' },
    { id: 7, image: kbike3, name: 'HC-BMX-025', price: '₱50.00', available: 5, description: 'Kids bikes without front baskets offer a more streamlined, lightweight, and versatile design.' },
    { id: 8, image: kbike4, name: 'HC-BMX-70', price: '₱50.00', available: 5, description: 'Kids bikes with front baskets offer a practical and engaging way for young riders to explore.' },
  ];

  const bike = bikeData.find((b) => b.id === bikeId);
  const navigation = useNavigation();
  const [isPressedButton, setIsPressedButton] = useState(false);

  return (
    <View style={styles.container}>
      {bike && (
        <>
          <Image source={bike.image} style={styles.bikeImage} />
          <View style={styles.detailsContainer}>
            <Text style={styles.bikeName}>{bike.name}</Text>
            <Text style={styles.availableBikes}>Available Bikes: {bike.available}</Text>
            <Text style={styles.bikeTDescription}>Description</Text>
            <Text style={styles.bikeDescription}>{bike.description}</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceLabelContainer}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.bikePrice}>{bike.price} Per hour</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, isPressedButton && styles.buttonPressed]}
                onPressIn={() => setIsPressedButton(true)}
                onPressOut={() => setIsPressedButton(false)}
                onPress={() => navigation.navigate('RentReserveInfo', {
                  bikeId: bike.id,
                  bikeName: bike.name,
                  bikePrice: bike.price,
                  bikeAvailable: bike.available,
                  bikeImage: bike.image,
                  bikeDescription: bike.description
                })}
              >
                <Text style={styles.buttonText}>Reserve Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

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
    backgroundColor: '#D6D6CA',
    alignItems: 'center',
    padding: 10,
  },
  bikeImage: {
    width: 360,
    height: 250,
    borderRadius: 1,
    marginTop: -10,
  },
  detailsContainer: {
    backgroundColor: '#D6D6CA',
    borderRadius: 30,
    padding: 10,
    marginTop: -30,
    width: '105%',
    height: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-around',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bikeName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  availableBikes: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    marginBottom: 10,
    marginTop: -30,
  },
  bikeTDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bikeDescription: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -30,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  priceLabelContainer: {
    alignItems: 'flex-start',
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bikePrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#005600',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
    width: '50%',
  },
  buttonPressed: {
    backgroundColor: '#007A00',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconRowBelow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D6D6CA',
    padding: 5,
    width: '105%',
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

export default BikeDetails;
