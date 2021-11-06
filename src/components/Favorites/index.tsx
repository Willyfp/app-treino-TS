import React, { useEffect } from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { TextDefault } from '../../styles';
import { ButtonFavorite, ScrollFavorites } from './styles';
import { Creators as favoritesActions } from '../../store/reducers/favoritesReducer';
import { Animated } from 'react-native';
import { Favorite } from '../../types/datas';
import { RootState } from '../../store/reducers';
import { connect, ConnectedProps } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types/global';

const mapStateToProps = ({ favoritesReducer }: RootState) => ({
  data: favoritesReducer.getIn(['data']),
});

const mapDispatchToProps = {
  listFavoritesRequest: favoritesActions.listFavoritesRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface FavoriteProps extends PropsFromRedux {
  scrollY: Animated.Value;
}

const Favorites = ({ scrollY, data, listFavoritesRequest }: FavoriteProps) => {
  const { colors } = useTheme();

  const { navigate } = useNavigation();

  useEffect(() => {
    listFavoritesRequest();
  }, []);

  const HEADER_MAX_HEIGHT = 250;
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const dataList = data as readonly Favorite[];

  const hasData = !isEmpty(data);

  return (
    <ScrollFavorites
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        transform: [
          {
            translateY: headerTranslateY,
          },
        ],
      }}>
      {hasData &&
        dataList.map((item: Favorite) => (
          <ButtonFavorite
            key={item.id}
            onPress={() => navigate(item.name as keyof RootStackParamList)}>
            <FontAwesome5Icon
              solid
              name={item.iconName || 'user'}
              size={20}
              color={colors.primary}
            />
            <TextDefault fontSize={15} color={colors.primary}>
              {item.title}
            </TextDefault>
          </ButtonFavorite>
        ))}
    </ScrollFavorites>
  );
};

export default connector(Favorites);
