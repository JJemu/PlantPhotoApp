import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen';
import ScanScreen from '../screens/ScanScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BottomNavBar from './BottomNavBar';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomNavBar" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavBar" component={BottomNavBar} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
