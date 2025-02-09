import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../components/Button';
import { AppTheme } from '../theme/Theme';
import { PlantContext } from '../context/PlantContext';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

const PlantImage = styled(Image)`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

const Input = styled(TextInput)`
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.gray};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  width: 80%;
  background-color: ${({ theme }) => theme.color.white};
`;

const ButtonContainer = styled(View)`
  margin-bottom: 10px;
`;

const DetailsScreen = () => {
  const theme = new AppTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params;
  const { savePlant, deletePlant } = useContext(PlantContext);

  const [name, setName] = useState(plant.name);
  const [notes, setNotes] = useState(plant.notes);
  const [image] = useState(plant.image);

  const handleSave = () => {
    const updatedPlant = { ...plant, name, notes, image };
    savePlant(updatedPlant);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Plant',
      'Are you sure you want to delete this plant?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          deletePlant(plant.id);
          navigation.navigate('List');
        }},
      ],
      { cancelable: true }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {image && (
          <>
            <PlantImage source={{ uri: image }} />
          </>
        )}
        <Input placeholder="Plant Name" value={name} onChangeText={setName} />
        <Input placeholder="Notes" value={notes} onChangeText={setNotes} />
      </Container>
        <ButtonContainer>
          <Button title="Save" onPress={handleSave} />
        </ButtonContainer>
        <ButtonContainer>
          <Button title="Delete Plant" onPress={handleDelete} variant="danger" />
        </ButtonContainer>
    </ThemeProvider>
  );
};

export default DetailsScreen;