import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { DefaultTheme, ThemeProvider } from 'styled-components/native';
import store from '../store';
import { dark, light } from '../styles/themes';
import PIPI from './Scree';
import GlobalModal from '../components/GlobalModal';
import BottomSheet from '../components/GlobalModal/BottomSheet';

const Routes = () => {
  const deviceTheme = useColorScheme();

  const theme: DefaultTheme = deviceTheme === 'light' ? light : dark;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalModal />
        <PIPI />
        <BottomSheet />
      </ThemeProvider>
    </Provider>
  );
};

export default Routes;
