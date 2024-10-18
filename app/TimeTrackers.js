import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', date: 'Today', time: 'Reserved at 2:00pm' },
  { id: '2', date: '04-14-24', time: 'Returning time will be at 4:00 pm' },
];

const { width, height } = Dimensions.get('window');

const TimeScreen = () => {
  const navigation = useNavigation();
  const totalDuration = 2 * 60 * 60; // Total duration in seconds (2 hours)
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      setProgress(0);

      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(intervalRef.current);
            return 1;
          }
          return Math.min(prev + 1 / totalDuration, 1);
        });
      }, 1000);
    }
  };

  const formattedTime = () => {
    const remainingTime = totalDuration * (1 - progress);
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = Math.floor(remainingTime % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Duration of use</Text>

      <View style={styles.circleContainer}>
        <ProgressCircle
          style={styles.progressCircle}
          progress={progress}
          progressColor={'green'}
        >
          <Text style={styles.timerText}>
            {formattedTime()}
          </Text>
        </ProgressCircle>
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
    padding: width * 0.03,
    backgroundColor: '#D6D6CA',
  },
  header: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.03,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  progressCircle: {
    height: width * 0.5,
    width: width * 0.5,
  },
  timerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 50,
    textAlign: 'center',
  },
  reservationCard: {
    backgroundColor: '#D6D6CA',
    padding: height * 0.02,
    marginBottom: height * 0.02,
    borderRadius: 5,
    elevation: 5,
  },
  reservationDate: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
    marginBottom: 5,
  },
  reservationTime: {
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: height * 0.02,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconRowBelow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D6D6CA',
    padding: 5,
    width: "100%",
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

export default TimeScreen;
