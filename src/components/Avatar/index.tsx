import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { ViewPhoto } from '../../pages/Profile/styles';
import { ImageAvatar } from './styles';

interface AvatarProps {
  value?: string;
}

const Avatar = ({ value }: AvatarProps) => {
  const { colors } = useTheme();

  return (
    <ViewPhoto>
      {value ? (
        <ImageAvatar
          source={{
            uri: value,
          }}
        />
      ) : (
        <FontAwesome5Icon name={'user'} solid color={colors.text} size={95} />
      )}
    </ViewPhoto>
  );
};

export default Avatar;
