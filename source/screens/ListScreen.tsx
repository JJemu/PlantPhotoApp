import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled, { ThemeProvider } from 'styled-components/native';
import { Button } from '../components/Button';
import { BodyText, AppTheme } from '../theme/Theme';

const Container = styled(View)`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

const MessageText = styled(BodyText)`
  text-align: center;
  margin-top: 20px;
`;

const PlantItem = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const PlantImage = styled(Image)`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;

const ListScreen = () => {
  const theme = new AppTheme();
  const navigation = useNavigation();
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPlants();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {plants.length === 0 ? (
          <MessageText>You have not added any plant photos.</MessageText>
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Details', { plant: item })}>
                <PlantItem>
                  {item.image && <PlantImage source={{ uri: item.image }} />}
                  <Text>{item.name} - {item.date}</Text>
                </PlantItem>
              </TouchableOpacity>
            )}
          />
        )}
        <ButtonContainer>
          <Button onPress={() => navigation.navigate('Scan')} title="Add Plant" />
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
};

export default ListScreen;