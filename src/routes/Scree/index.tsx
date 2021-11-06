import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { connect, ConnectedProps, Provider } from 'react-redux';
import { DefaultTheme, useTheme } from 'styled-components/native';

import { RootState } from '../../store/reducers';
import { dark, light } from '../../styles/themes';
import ScreensAuthenticated, { screensNotAuth } from '../screens';

import auth, { Creators as AuthActions } from '../../store/reducers/auth';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const mapStateToProps = ({ authReducer }: RootState) => ({
  authenticated: authReducer.getIn(['authenticated']),
  loading: authReducer.getIn(['loading']),
  loadingSplashScreen: authReducer.getIn(['loadingSplashScreen']),
});

const mapDispatchToProps = {
  loadUser: AuthActions.loadUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Routes({
  authenticated,
  loadUser,
  loadingSplashScreen,
}: PropsFromRedux) {
  const deviceTheme = useColorScheme();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!loadingSplashScreen) {
      SplashScreen.hide();
    }
  }, [loadingSplashScreen]);

  const theme: DefaultTheme = deviceTheme === 'light' ? light : dark;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authenticated ? (
          <Stack.Screen name={'Screens'} component={ScreensAuthenticated} />
        ) : (
          Object.entries(screensNotAuth).map(([name, component]) => (
            <Stack.Screen key={name} name={name} component={component} />
          ))
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default connector(Routes);
