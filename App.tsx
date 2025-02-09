import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from './source/navigation/AppStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
}
