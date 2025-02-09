import React, { useState, useContext, useEffect } from 'react';
import { View, Image, TextInput, Alert, Platform, PermissionsAndroid } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { launchCamera } from 'react-native-image-picker';
import { AppTheme } from '../theme/Theme';
import { Button } from '../components/Button';
import { PlantContext } from '../context/PlantContext';

const Container = styled(View)`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const DetailsContainer = styled(View)`
  width: 100%;
  align-items: center;
`;

const PlantImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-vertical: 10px;
`;

const Input = styled(TextInput)`
  border-bottom-width: 1px;
  margin-bottom: 10px;
  width: 80%;
`;

const BackButtonContainer = styled(View)`
  position: absolute;
  top: 20px;
  left: 20px;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const BackButtonText = styled.Text`
  color: ${({ theme }) => theme.color.primary};
  margin-left: 5px;
`;

const ScanScreen = () => {
  const navigation = useNavigation();
  const { savePlant } = useContext(PlantContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    takePhoto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app requires access to your camera to take plant photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Camera access is required to take photos.');
          return false;
        }
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    // eslint-disable-next-line curly
    if (!hasPermission) return;

    const options = { mediaType: 'photo', cameraType: 'back' };
    launchCamera(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        Alert.alert('Camera Cancelled', 'You did not take a photo.');
        navigation.goBack();
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        navigation.goBack();
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      } else {
        Alert.alert('Error', 'Failed to capture image.');
        navigation.goBack();
      }
    });
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSave = async () => {
    if (!name.trim()) {
      // eslint-disable-next-line no-alert
      alert('Please enter a plant name.');
      return;
    }
    const newPlant = {
      id: generateUniqueId(),
      name,
      image,
      notes,
      date: new Date().toLocaleDateString(),
    };
    await savePlant(newPlant);
    navigation.navigate('List');
  };

  const theme = new AppTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BackButtonContainer>
          <BackButton onPress={() => navigation.goBack()}>
            <Icons name="chevron-left" size={20} color={theme.color.primary} />
            <BackButtonText>Back</BackButtonText>
          </BackButton>
        </BackButtonContainer>
        {image && (
          <DetailsContainer>
            <PlantImage source={{ uri: image }} />
            <Input placeholder="Plant Name" value={name} onChangeText={setName} />
            <Input placeholder="Notes" value={notes} onChangeText={setNotes} />
            <Button title="Save" onPress={handleSave} />
          </DetailsContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ScanScreen;
