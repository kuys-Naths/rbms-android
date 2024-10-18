import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const bikeData = [
  {
    id: '1',
    name: "ADULT'S BICYCLE",
    available: 4,
    image: require('../assets/images/Bike4.png'), // replace with your image path
  },
  {
    id: '2',
    name: "KID'S BICYCLE",
    available: 2,
    image: require('../assets/images/kBike4.png'), // replace with your image path
  },
];

const App = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.available}>Available Bikes: {item.available}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bikeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
  card: {
    flexDirection: 'row', // Arrange children in a row
    backgroundColor: '#D6D6CA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 10, // Adds shadow effect
    marginTop: 100  
  },
  image: {
    width: 150, // Adjust width as needed
    height: 120, // Adjust height as needed
    borderRadius: 10,
    marginRight: 15, // Space between image and text
  },
  textContainer: {
    flex: 1, // Allow the text container to fill the remaining space
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  available: {
    fontSize: 14,
    color: '#555',
  },
});

export default App;
