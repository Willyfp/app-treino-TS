import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import Cards from '../../components/Cards/Cards';
import Favorites from '../../components/Favorites';
import Header from '../../components/Header';
import { RootState } from '../../store/reducers';
import { TextDefault } from '../../styles';
import { ICards } from '../../types/datas';
import { Icon, ViewAbsolute, ViewProfile } from './styles';
import { Creators as AuthActions } from '../../store/reducers/auth';

const mapStateToProps = ({ authReducer }: RootState) => ({
  user: authReducer.getIn(['user']),
  dataCards: authReducer.getIn(['data']),
});

const mapDispatchToProps = {
  listAllRequest: AuthActions.listAllRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Home({ user, dataCards, listAllRequest }: PropsFromRedux) {
  const { colors } = useTheme();

  const [privacity, setPrivacity] = useState(true);

  function togglePrivacity() {
    setPrivacity(!privacity);
  }

  useFocusEffect(
    useCallback(() => {
      listAllRequest();
    }, []),
  );

  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 250;
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  return (
    <>
      <SafeAreaView>
        <Header
          isHome
          title={'Home'}
          name={'Home'}
          onPress={togglePrivacity}
          privacity={privacity}
        />
        <ViewProfile style={{ transform: [{ translateY: headerTranslateY }] }}>
          <ViewAbsolute>
            <Icon name={'user-circle'} size={90} color={colors.default} />
            <View>
              <TextDefault fontSize={35}>Bem vindo,</TextDefault>
              <TextDefault fontSize={25}>{user?.name}</TextDefault>
            </View>
          </ViewAbsolute>
        </ViewProfile>
      </SafeAreaView>
      <Favorites scrollY={scrollY} />
      <Cards
        scrollY={scrollY}
        data={dataCards as Array<ICards>}
        privacity={privacity}
      />
    </>
  );
}

export default connector(Home);
