import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported

const reserveFee = 25; // Set reservation fee to ₱25 globally
const reservedHourPrice = 50; // Set reserved hour price to ₱50 globally
const durationHourPrice = 50; // Set duration of use to ₱50 globally

const RentReserveInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bikeId, bikeName, bikePrice, bikeAvailable, bikeImage, bikeDescription } = route.params;

  const [durationOfUse, setDurationOfUse] = useState(1); // Default to 1
  const [reservedHour, setReservedHour] = useState(0); // Default to 0
  const [reservationNumber, setReservationNumber] = useState(null); // State for reservation number
  const [isReserved, setIsReserved] = useState(false); // State to track reservation status

  // Store generated reservation numbers
  const [existingReservations, setExistingReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await AsyncStorage.getItem('reservations');
        if (reservations) {
          setExistingReservations(JSON.parse(reservations));
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  const totalPrice = () => {
    return durationHourPrice * durationOfUse + reservedHourPrice * reservedHour + reserveFee;
  };

  const incrementDuration = () => {
    if (durationOfUse < 5) {
      setDurationOfUse(durationOfUse + 1);
    }
  };

  const decrementDuration = () => {
    if (durationOfUse > 0) {
      setDurationOfUse(durationOfUse - 1);
    }
  };

  const incrementReservedHour = () => {
    if (reservedHour < 5) {
      setReservedHour(reservedHour + 1);
    }
  };

  const decrementReservedHour = () => {
    if (reservedHour > 0) {
      setReservedHour(reservedHour - 1);
    }
  };

  const handleReserve = async () => {
    // Generate a random number and check for uniqueness
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
    } while (existingReservations.includes(randomNumber)); // Keep generating until unique

    setReservationNumber(randomNumber); // Save the reservation number in state
    setIsReserved(true); // Set reservation status to true

    const reservationInfo = `You have reserved ${bikeName} for ${durationOfUse} hour/s and ${reservedHour} reserved hour/s. Total cost: ₱${totalPrice().toFixed(2)}.\nYour reservation number is: ${randomNumber}.`;

    Alert.alert(
      "Confirm Reservation",
      reservationInfo,
      [
        {
          text: "No",
          onPress: () => {
            console.log("Reservation cancelled");
            setIsReserved(false); // Reset reservation status if cancelled
          },
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            console.log("Reservation Number:", randomNumber); // Log the reservation number in the terminal
            // Save the reservation number to AsyncStorage
            const updatedReservations = [...existingReservations, randomNumber];
            setExistingReservations(updatedReservations);
            await AsyncStorage.setItem('reservations', JSON.stringify(updatedReservations));

            navigation.navigate('RentReserveNow', {
              bikeId,
              bikeName,
              bikePrice,
              durationOfUse,
              reservedHour,
              totalPrice: totalPrice(),
              bikeImage,
              reservationNumber: randomNumber, // Pass the random number
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Text style={styles.userLabel}>Name: Mariella Angelica A. Fernandez</Text>
        <Text style={styles.userLabel}>Address: San Jose, Rodriguez, Rizal</Text>
        <Text style={styles.userLabel}>Contact no: 09123456789</Text>
      </View>

      <View style={styles.bikeAndCountersContainer}>
        <Image source={bikeImage} style={styles.bikeImage} />

        <View style={styles.counterContainer}>
          <View style={styles.counterBlock}>
            <Text style={styles.label}>Duration of use</Text>
            <View style={styles.counter}>
              <TouchableOpacity style={styles.counterButton} onPress={decrementDuration}>
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{durationOfUse}</Text>
              <TouchableOpacity style={styles.counterButton} onPress={incrementDuration}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
            {durationOfUse === 5 && <Text style={styles.limitText}>Max 5 hours</Text>}
          </View>

          <View style={styles.counterBlock}>
            <Text style={styles.label}>Reserved hour</Text>
            <View style={styles.counter}>
              <TouchableOpacity style={styles.counterButton} onPress={decrementReservedHour}>
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{reservedHour}</Text>
              <TouchableOpacity style={styles.counterButton} onPress={incrementReservedHour}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
            {reservedHour === 5 && <Text style={styles.limitText}>Max 5 hours</Text>}
          </View>
        </View>
      </View>

      <View style={styles.bikeDetails}>
        <Text style={styles.bikeName}>{bikeName}</Text>
        <Text style={styles.bikePrice}>Price per hour: ₱{durationHourPrice}</Text>
        <Text style={styles.reservedHourPrice}>Reserved Hour Price: ₱{reservedHourPrice}</Text>
       
        <Text style={styles.bikeDescription}>{bikeDescription}</Text>
      </View>

      <View style={styles.reservationInfo}>
      <Text style={styles.reserveFee}>Reservation Fee: ₱{reserveFee}</Text>
        <Text style={styles.label}>Duration of use: {durationOfUse} hour/s</Text>
        <Text style={styles.label}>Reserved hour: {reservedHour} hour/s</Text>
        
        
        {reservationNumber !== null && (
          <Text style={styles.label}>Reservation Number: {reservationNumber}</Text>
        )}
        <Text style={styles.labelPayment}>Payment method: </Text>
        <Text style={styles.Totallabel}>Total: ₱{totalPrice().toFixed(2)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.reserveButton} 
        onPress={handleReserve} 
        disabled={isReserved} // Disable button if already reserved
      >
        <Text style={styles.buttonText}>Reserve Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6CA',
    padding: 20,
    justifyContent: 'space-around',
  },
  userDetails: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#D6D6CA',
    elevation: 10,
    borderRadius: 10
  },
  userLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  bikeAndCountersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  bikeImage: {
    width: 200,
    height: 150,
    borderRadius:10,
  },
  bikeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bikePrice: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  bikeDescription: {
    fontSize: 14,
    color: '#555',
  },
  availableBikes: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: -5,
    marginBottom: 5,
  },
  reserveFee:{
    fontSize: 15,

    fontWeight: '500',
  },
  counterContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  counterBlock: {
    marginBottom: 10,
    alignItems: 'center',
    marginTop: -5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reservedHourPrice:{
    fontSize: 15,
    fontWeight: '500',
    marginTop: -5,
  },
  labelPayment: {
    fontSize: 15,
    fontWeight: 'bold',
 
  },
  Totallabel:{
    fontSize: 15,
    marginTop: 20,
    color: 'red',
    fontWeight: '600'


  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#099654',
    borderRadius: 5,
    padding: 5,
  },
  counterButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
   
    borderRadius: 5,
  },
  counterText: {
    fontSize: 20,
  },
  counterValue: {
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  limitText: {
    color: 'red',
    fontSize: 12,
  },
  reservationInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#D6D6CA',
    elevation: 10,
    borderRadius: 10,
  },
  reserveButton: {
    backgroundColor: '#355E3B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
export default RentReserveInfo;
