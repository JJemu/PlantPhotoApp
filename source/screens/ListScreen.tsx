import React, { useContext, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled, { ThemeProvider } from 'styled-components/native';
import { PlantContext } from '../context/PlantContext';
import { AppTheme } from '../theme/Theme';
import { Button } from '../components/Button';

const Container = styled(View)`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

const MessageText = styled(Text)`
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.color.gray};
`;

const PlantItem = styled(TouchableOpacity)`
  flex: 1;
  margin: 5px;
  position: relative;
`;

const PlantImage = styled(Image)`
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;

const PlantNameOverlay = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s;
  ${PlantItem}:hover & {
    opacity: 1;
  }
`;

const PlantNameText = styled(Text)`
  color: white;
  text-align: center;
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
  const { plants, loadPlants } = useContext(PlantContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPlants();
    });
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            numColumns={2}
            key={2}
            renderItem={({ item }) => (
              <PlantItem onPress={() => navigation.navigate('Details', { plant: item })}>
                <PlantImage source={{ uri: item.image }} />
                <PlantNameOverlay>
                  <PlantNameText>{item.name}</PlantNameText>
                </PlantNameOverlay>
              </PlantItem>
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
