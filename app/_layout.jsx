// THIS PAGE FOR EDITING THE HEADER OF EVERY PAGES!!


import { StyleSheet, Text, View } from 'react-native'
import {Slot, Stack} from 'expo-router';
// Adjust path as necessary
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name ="index" options={{headerShown:false}} />
      <Stack.Screen name ="Homepage" options={{headerShown:false}} />
      <Stack.Screen name="ViewAvailableBike" options={{headerShown: true, title: '',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="BikeDetails" options={{headerShown: true, title: 'Reservation',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name ="RegisterAcc" options={{headerShown:false}} />
      <Stack.Screen name ="LoginAcc" options={{headerShown:false}} />
      <Stack.Screen name ="SignUp" options={{headerShown: true, title: 'CREATE ACCOUNT',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name ="Rent" options={{headerShown:false}} />
      <Stack.Screen name ="RentIcon" options={{headerShown:false}} />
      <Stack.Screen name="ForgetPass" options={{headerShown: true, title: '',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="RentBikeDetails" options={{headerShown: true, title: 'Reservation',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="SmartLock" options={{headerShown: true, title: 'Smart Lock',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="RentAccount" options={{headerShown: true, title: 'Your Account',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="RentHistory" options={{headerShown: true, title: 'Booking History',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="AvailableBike" options={{headerShown: true, title: 'Availability',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="TimeTrackers" options={{headerShown: true, title: 'Duration of use',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="RentReserveNow" options={{headerShown: true, title: 'Reserved Hour',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="RentNotify" options={{headerShown: true, title: 'Notifications',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
      <Stack.Screen name="RentReserveInfo" options={{headerShown: true, title: 'Reservation',headerStyle: {backgroundColor: '#355E3B',}, headerTintColor: '#FFFFFF', headerTitleStyle: {fontWeight: 'bold', fontSize: 20},}} />
    </Stack>

) 
}

export default _layout

