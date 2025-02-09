import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PlantProvider } from './source/context/PlantContext';
import AppStackNavigator from './source/navigation/AppStackNavigator';

const App = () => {
  return (
    <PlantProvider>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </PlantProvider>
  );
};

export default App;
