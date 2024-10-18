import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, BackHandler, AppState } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const { width, height } = Dimensions.get('window');

// Image mapping based on bikeId
const bikeImages = {
  1: require('../assets/images/Bike1.png'),
  2: require('../assets/images/Bike2.png'),
  3: require('../assets/images/Bike3.png'),
  4: require('../assets/images/Bike4.png'),
  5: require('../assets/images/kBike1.png'),
  6: require('../assets/images/kBike2.png'),
  7: require('../assets/images/kBike3.png'),
  8: require('../assets/images/kBike4.png'),
  // Add more bike images here...
};

const DurationScreen = () => {
  const navigation = useNavigation(); 
  const route = useRoute(); 
  const { bikeId, bikeName, bikePrice, reservedHour, reservationNumber } = route.params;

  const totalDuration = reservedHour * 3600; 
  const [progress, setProgress] = useState(0); 
  const intervalRef = useRef(null); 
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); 
  const [timerStarted, setTimerStarted] = useState(false); 

  const bikeImage = bikeImages[bikeId]; 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (!intervalRef.current) { 
      intervalRef.current = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1 / totalDuration, 1));
      }, 1000);
      setTimerStarted(true); 
    }
  };

  const formattedTime = () => {
    const remainingTime = totalDuration * (1 - progress);
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = Math.floor(remainingTime % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const returnDateTime = new Date(currentDateTime);
  returnDateTime.setHours(currentDateTime.getHours() + reservedHour);

  const data = timerStarted
    ? [
        { id: `1_${currentDateTime.getTime()}`, date: currentDateTime.toLocaleDateString(), time: `Reserved at ${currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` },
        { id: `2_${returnDateTime.getTime()}`, date: returnDateTime.toLocaleDateString(), time: `Returning time will be at ${returnDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` },
      ]
    : [];

  useEffect(() => {
    const loadTimerData = async () => {
      try {
        const savedProgress = await AsyncStorage.getItem('timerProgress');
        const savedTime = await AsyncStorage.getItem('savedTime');

        if (savedProgress && savedTime) {
          const parsedProgress = parseFloat(savedProgress);
          const elapsedTime = Math.floor((new Date() - new Date(savedTime)) / 1000); 
          setProgress(Math.min(parsedProgress + elapsedTime / totalDuration, 1)); 
        } else {
          startTimer(); 
        }
      } catch (error) {
        console.error('Failed to load timer data:', error);
      }
    };

    loadTimerData();

    const saveProgress = setInterval(async () => {
      try {
        await AsyncStorage.setItem('timerProgress', progress.toString());
        await AsyncStorage.setItem('savedTime', new Date().toString());
      } catch (error) {
        console.error('Failed to save timer data:', error);
      }
    }, 1000);

    return () => {
      clearInterval(saveProgress);
    };
  }, []);

  useEffect(() => {
    if (progress < 1) {
      startTimer();
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 1) {
      submitReservationData();
    }
  }, [progress]);

  const submitReservationData = async () => {
    const reservationTime = new Date().toISOString(); 

    const reservation = {
      bikeName,
      bikePrice,
      reservedHour,
      reservedAt: reservationTime,
      reservationNumber,
      userDetails: {
        contactNo: '0935****123' 
      },
      bikeImage: bikeImage,
    };

    try {
      const storedReservations = await AsyncStorage.getItem('reservations');
      const reservations = storedReservations ? JSON.parse(storedReservations) : [];
      reservations.push(reservation);

      await AsyncStorage.setItem('reservations', JSON.stringify(reservations));
      
      navigation.navigate('RentHistory', { bookingDetails: reservation, reservationNumber: reservation.reservationNumber });
    } catch (error) {
      console.error('Failed to store reservation:', error);
      Alert.alert("Error", "Failed to save reservation. Please try again.");
    }
  };

  // Prevent back navigation if the timer is running
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (timerStarted) {
          Alert.alert(
            "Timer Running",
            "You cannot go back while the timer is running.",
            [{ text: "OK", onPress: () => null }]
          );
          return true; 
        }
        return false; 
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [timerStarted])
  );

  // Prevent swipe gestures while the timer is running
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if (timerStarted) {
          e.preventDefault();
          Alert.alert(
            "Timer Running",
            "You cannot go back while the timer is running.",
            [{ text: "OK", onPress: () => null }]
          );
        }
      });

      return unsubscribe;
    }, [navigation, timerStarted])
  );

  // Save timer state when the app goes into the background
  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (nextAppState === "background") {
        try {
          await AsyncStorage.setItem('timerProgress', progress.toString());
          await AsyncStorage.setItem('savedTime', new Date().toString());
        } catch (error) {
          console.error('Failed to save timer data on app exit:', error);
        }
      } else if (nextAppState === "active") {
        try {
          const savedProgress = await AsyncStorage.getItem('timerProgress');
          const savedTime = await AsyncStorage.getItem('savedTime');
  
          if (savedProgress && savedTime) {
            const parsedProgress = parseFloat(savedProgress);
            const elapsedTime = Math.floor((new Date() - new Date(savedTime)) / 1000);
            setProgress(Math.min(parsedProgress + elapsedTime / totalDuration, 1));
          }
        } catch (error) {
          console.error('Failed to load timer data:', error);
        }
      }
    });
  
    return () => {
      subscription.remove();
    };
  }, [progress, totalDuration]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={bikeImage} style={styles.bikeImage} />
        <View>
          <Text style={styles.bikeName}>{bikeName}</Text>
          <Text style={styles.bikePrice}>Price: {bikePrice}</Text>
          <Text style={styles.reservationNumber}>Reservation #{reservationNumber}</Text>
        </View>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          Reservation Time: {formattedTime()}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reservationCard}>
            <Text style={styles.reservationDate}>{item.date}</Text>
            <Text style={styles.reservationTime}>{item.time}</Text>
          </View>
        )}
      />

      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.03,
    backgroundColor: '#D6D6CA',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: height * 0.05,
    marginTop: 20,
  },
  bikeImage: {
    width: 130,
    height: 100,
    borderRadius: 10,

  },
  bikeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bikePrice: {
    fontSize: 15,
  },
  reservationNumber:{
  color: 'red',
  fontWeight: '500',
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  reservationCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  reservationDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservationTime: {
    fontSize: 14,
  },
  iconRowBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.05,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  iconText: {
    fontSize: 12,
  },
});
export default DurationScreen;
