import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import { TextDefault } from '../../styles';
import { IconHeader, ViewHeader } from './styles';
import { Creators as authActions } from '../../store/reducers/auth';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';
import { Creators as favoritesActions } from '../../store/reducers/favoritesReducer';
import { RootState } from '../../store/reducers';
import { Favorite } from '../../types/datas';
import isEmpty from 'lodash/isEmpty';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface HeaderProps extends PropsFromRedux {
  title: string;
  isHome?: boolean;
  name?: string;
  iconName?: string;
  isProfile?: boolean;
  privacity?: boolean;
  onPress?(): void;
}

const mapStateToProps = ({ favoritesReducer }: RootState) => ({
  data: favoritesReducer.getIn(['data']),
});

const mapDispatchToProps = {
  logout: authActions.logout,
  addFavorite: favoritesActions.addFavorite,
  removeFavorite: favoritesActions.removeFavorite,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const Header = ({
  title,
  isProfile,
  isHome,
  name,
  data,
  iconName,
  privacity,
  onPress,
  logout,
  addFavorite,
  removeFavorite,
}: HeaderProps) => {
  const { colors } = useTheme();

  const { dispatch } = useNavigation();

  const dataFavorites = data as readonly Favorite[];

  const hasData = !isEmpty(data);

  const isDefault = !isHome && !isProfile;

  const found = hasData
    ? dataFavorites.find((item: Favorite) => item.name === name)
    : undefined;

  function handleButton() {
    if (found !== undefined) {
      removeFavorite(found);
    } else {
      addFavorite({
        id: Date.now(),
        title: title,
        name: name,
        iconName: iconName,
      });
    }
  }

  function signOut() {
    logout();
  }

  function handleDrawer() {
    dispatch(DrawerActions.toggleDrawer);
  }

  return (
    <ViewHeader>
      <TouchableOpacity onPress={handleDrawer}>
        <IconHeader name={'bars'} size={25} color={colors.default} />
      </TouchableOpacity>
      <TextDefault fontSize={30}>{title}</TextDefault>

      {isProfile && (
        <TouchableOpacity onPress={signOut}>
          <IconHeader name={'sign-in-alt'} size={25} color={colors.text} />
        </TouchableOpacity>
      )}

      {isHome && (
        <TouchableOpacity onPress={onPress}>
          <IconHeader
            name={privacity ? 'eye-slash' : 'eye'}
            size={25}
            color={colors.default}
          />
        </TouchableOpacity>
      )}

      {isDefault && (
        <TouchableOpacity onPress={handleButton}>
          <IconHeader
            name={'star'}
            solid={found ? true : false}
            size={25}
            color={colors.default}
          />
        </TouchableOpacity>
      )}
    </ViewHeader>
  );
};

export default connector(Header);
