import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);

  const loadPlants = async () => {
    try {
      const storedPlants = await AsyncStorage.getItem('plants');
      if (storedPlants) {
        setPlants(JSON.parse(storedPlants));
      }
    } catch (error) {
      console.error('Error loading plants:', error);
    }
  };

  const savePlant = async (newPlant) => {
    try {
      const existingPlants = await AsyncStorage.getItem('plants');
      const plantsArray = existingPlants ? JSON.parse(existingPlants) : [];
      const plantIndex = plantsArray.findIndex((plant) => plant.id === newPlant.id);

      if (plantIndex > -1) {
        plantsArray[plantIndex] = newPlant;
      } else {
        plantsArray.push(newPlant);
      }

      await AsyncStorage.setItem('plants', JSON.stringify(plantsArray));
      setPlants(plantsArray);
      console.log('Plant saved successfully:', newPlant);
    } catch (error) {
      console.error('Error saving plant:', error);
    }
  };

  const deletePlant = async (plantId) => {
    try {
      const existingPlants = await AsyncStorage.getItem('plants');
      const plantsArray = existingPlants ? JSON.parse(existingPlants) : [];
      const updatedPlants = plantsArray.filter((plant) => plant.id !== plantId);

      await AsyncStorage.setItem('plants', JSON.stringify(updatedPlants));
      setPlants(updatedPlants);
      console.log('Plant deleted successfully:', plantId);
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  return (
    <PlantContext.Provider value={{ plants, loadPlants, savePlant, deletePlant }}>
      {children}
    </PlantContext.Provider>
  );
};
