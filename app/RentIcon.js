 //MOBILE RENT ICON!!

 import React from 'react';
 import { View, Text, Image, TouchableOpacity, ScrollView,  StyleSheet, TextInput } from 'react-native';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import { useNavigation } from '@react-navigation/native';
 import { LinearGradient } from 'expo-linear-gradient';
 
 // Import your local images
 import bike1 from '../assets/images/Bike1.png';
 import bike2 from '../assets/images/Bike2.png';
 import bike3 from '../assets/images/Bike3.png';
 import bike4 from '../assets/images/Bike4.png';
 
 import kBike1 from '../assets/images/kBike1.png';
 import kbike2 from '../assets/images/kBike2.png';
 import kbike3 from '../assets/images/kBike3.png';
 import kbike4 from '../assets/images/kBike4.png';
 
 
 
 const HomePage = () => {
   const navigation = useNavigation();
   
   
 
   const bikes = [
     { id: 1, image: bike1, name: 'Japanese bike', price: '₱90.00' },
     { id: 2, image: bike2, name: 'Mountain bike', price: '₱100.00' },
     { id: 3, image: bike3, name: 'Mountain bike',price: '₱100.00' },
     { id: 4, image: bike4, name: 'Road bike', price: '₱100.00' },
     { id: 5, image: kBike1, name: 'HC-BMX-041', price: '₱100.00' },
     { id: 6, image: kbike2, name: 'HC-BMX-042', price: '₱100.00' },
     { id: 7, image: kbike3, name: 'HC-BMX-025', price: '₱100.00' },
     { id: 8, image: kbike4, name: 'HC-BMX-70', price: '₱100.00' },
     
    
   ];
 
   return (
     
     <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Search */}
        <LinearGradient colors={['#355E3B', '#5F8575', '#D6D6CA']} style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for bikes"
            placeholderTextColor="gray"
          />
        </View>
      </LinearGradient>
 
       {/* Icons Section */}
  <View style={styles.iconRow}>

<TouchableOpacity
  style={styles.iconButton}
  onPress={() => navigation.navigate('RentIcon')}
>
  <Image
    source={require('../assets/images/RentIcon.png')}  // Add your local image here
    style={{ width: 40, height: 40 }}
  />
  <Text style={styles.iconText}>Rent</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.iconButton}
  onPress={() => navigation.navigate('SmartLock')}
>
  <Image
    source={require('../assets/images/SmartLockIcon.png')}  // Add your local image here
    style={{ width: 40, height: 40 }}
  />
  <Text style={styles.iconText}>Smart Lock</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.iconButton}
  onPress={() => navigation.navigate('AvailableBike')}
>
  <Image
    source={require('../assets/images/AvailabiltyIcon.png')}  // Add your local image here
    style={{ width: 40, height: 40 }}
  />
  <Text style={styles.iconText}>Availability</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.iconButton}
  onPress={() => navigation.navigate('TimeTrackers')}
>
  <Image
    source={require('../assets/images/TimeTrackerIcon.png')}  // Add your local image here
    style={{ width: 40, height: 40 }}
  />
  <Text style={styles.iconText}>Time Tracker</Text>
</TouchableOpacity>

</View>
 
       {/* Bike Grid */}
       <View style={styles.bikeGrid}>
         {bikes.map((bike) => (
           <TouchableOpacity
             key={bike.id}
             style={styles.bikeCard}
             onPress={() => navigation.navigate('RentBikeDetails', { bikeId: bike.id })}
           >
             <Image source={bike.image} style={styles.bikeImage} />
             <Text style={styles.bikeName}>{bike.name}</Text>
             <Text style={styles.bikePrice}>{bike.price} per hour</Text>
           </TouchableOpacity>
           
         ))}
       </View>
 
            {/* Footer Navigation */}
      <View style={styles.iconRowBelow}>

<TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Rent')}>
  <Image source={require('../assets/images/HomeIcon.png')} style={styles.iconImage} />
  <Text style={styles.iconText}>Home</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RentHistory')} >
  <Image source={require('../assets/images/HistoryIcon.png')} style={styles.iconImage} />
  <Text style={styles.iconText}>History</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.iconButton} onPress={() =>  navigation.navigate('RentNotify')} >
  <Image source={require('../assets/images/NotificationsIcon.png')} style={styles.iconImage} />
  <Text style={styles.iconText}>Notifications</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.iconButton}
  onPress={() => navigation.navigate('RentAccount')}
>
  <Image source={require('../assets/images/AccountIcon.png')} style={styles.iconImage} />
  <Text style={styles.iconText}>Account</Text>
</TouchableOpacity>
</View>
     </ScrollView>
 
     
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flexGrow: 1,
   backgroundColor: '#D6D6CA',
   
   },
  header: {
    paddingVertical: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  iconRow: {
  flexDirection: 'row',
  justifyContent:'space-evenly',
  marginVertical: 15,
  backgroundColor: '#D6D6CA',
  borderWidth: 1, // Border width
  borderColor: '#D6D6CA', // Border color
  borderRadius: 10, // Optional: rounded corners
  padding: 5, // Optional: add padding inside the border
  marginLeft: 20,
  marginRight: 20,
  marginTop: -30,
  elevation: 5,    
},
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
   bikeGrid: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-around',
   },
   bikeCard: {
     width: '45%',
     marginBottom: 5,
     alignItems: 'center',
     backgroundColor: '#D6D6CA',
     padding: 10,
     borderRadius: 5,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     textAlign: 'left',
   },
   bikeImage: {
     width: '100%',
     height: 100,
     borderRadius: 5,
    
   },
   bikeName: {
     fontSize: 15,
     fontWeight: '500'
   },
   bikePrice: {
     marginTop: 2,
     fontSize: 10,
     marginBottom: 10,
   },
   iconRowBelow: {
    flexDirection: 'row',
    justifyContent:"space-around",
    marginVertical: 13,
    backgroundColor: '#D6D6CA',
    padding: 5, // Optional: add padding inside the border
  },
  iconImage: {
    width: 40, // or the size you want
    height: 40, // or the size you want
  },
 });
 
 export default HomePage;