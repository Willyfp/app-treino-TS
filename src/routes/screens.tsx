import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'styled-components';
import { TextDefault } from '../styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Profile from '../pages/Profile';
import Dependents from '../pages/Dependents';
import Actives from '../pages/Actives';

export const screensNotAuth = {
  Login,
  Register,
  Home,
};

export const screensAuth = {
  Home: {
    icon: 'home',
    name: 'Home',
    component: Home,
  },
  Dependents: {
    icon: 'users',
    name: 'Dependentes',
    component: Dependents,
  },
  Actives: {
    icon: 'car',
    name: 'Ativos',
    component: Actives,
  },
};

export default function ScreensAuthenticated() {
  const Drawer = createDrawerNavigator();

  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name={'Profile'}
        options={{
          drawerItemStyle: {
            marginLeft: -1,
            width: '102%',
            borderBottomWidth: 1,
            padding: 10,
          },
          drawerLabel: () => (
            <TextDefault color={colors.primary} fontSize={20}>
              Perfil
            </TextDefault>
          ),
          drawerIcon: () => (
            <FontAwesome5Icon
              solid
              name={'user-circle'}
              color={colors.primary}
              size={40}
            />
          ),
        }}
        component={Profile}
      />
      {Object.entries(screensAuth).map(([name, component]) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            drawerLabel: () => (
              <TextDefault color={colors.primary} fontSize={14}>
                {component.name}
              </TextDefault>
            ),
            drawerIcon: () => (
              <FontAwesome5Icon
                solid
                name={component.icon}
                color={colors.primary}
                size={20}
              />
            ),
          }}
          component={component.component}
        />
      ))}
    </Drawer.Navigator>
  );
}
