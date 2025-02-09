import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import styled, { ThemeProvider } from 'styled-components/native';
import ListScreen from '../screens/ListScreen';
import { BodyText, AppTheme } from '../theme/Theme';
import { PlatformPressable } from '@react-navigation/elements';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.primary};
`;

const PlaceholderScreen = ({ name }) => (
  <Container>
    <BodyText>{name} Screen</BodyText>
  </Container>
);

const SettingsScreen = () => <PlaceholderScreen name="Settings" />;
const ProfileScreen = () => <PlaceholderScreen name="Profile" />;

const Tab = createBottomTabNavigator();

const IconWrapper = styled(View)<{ focused: boolean }>`
  background-color: ${({ theme, focused }) => (focused ? theme.color.primary : 'transparent')};
  padding: 5px;
  border-radius: 15px;
  height: 29px;
`;

const IconComponent = ({ name, focused }) => (
  <IconWrapper focused={focused}>
    <Icons name={name} size={20} color={focused ? '#fff' : '#7B7B7B'} />
  </IconWrapper>
);

const iconMapping = {
  List: 'list',
  Settings: 'cog',
  Profile: 'user',
};

const getTabBarIcon = (routeName, focused) => {
  return <IconComponent name={iconMapping[routeName]} focused={focused} />;
};

const CustomTabBarButton = (props) => (
  <PlatformPressable
    {...props}
    android_ripple={{ color: 'transparent' }}
  />
);

const BottomNavBar = () => {
  const theme = new AppTheme();

  return (
    <ThemeProvider theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
          tabBarLabelStyle: {
            color: theme.color.gray,
          },
          tabBarStyle: {
            backgroundColor: theme.color.lightGray,
            height: 70,
          },
          tabBarItemStyle: {
            paddingBottom: 10,
          },
          tabBarButton: CustomTabBarButton,
        })}
      >
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </ThemeProvider>
  );
};

export default BottomNavBar;