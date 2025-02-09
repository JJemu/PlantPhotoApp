import React, { useState } from 'react';
import { Image, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '../components/Button';

const Container = styled(View)`
  flex: 1;
  padding: 20px;
`;

const PlantImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const Input = styled(TextInput)`
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

const DetailsScreen = ({ route, navigation }) => {
  const { plant } = route.params;
  const [name, setName] = useState(plant.name);
  const [notes, setNotes] = useState(plant.notes);

  return (
    <Container>
      {plant.image && <PlantImage source={{ uri: plant.image }} />}
      <Input value={name} onChangeText={setName} />
      <Input value={notes} onChangeText={setNotes} />
      <Button title="Save Changes" onPress={() => navigation.goBack()} />
    </Container>
  );
};

export default DetailsScreen;