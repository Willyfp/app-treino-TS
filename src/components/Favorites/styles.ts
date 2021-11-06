import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const ScrollFavorites = styled(Animated.ScrollView)`
  background-color: transparent;
  position: absolute;
  height: 110px;
  z-index: 1;
  top: 270px;
`;

export const ButtonFavorite = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.text};
  margin-horizontal: 8px;
  height: 90px;
  elevation: 6;
  border-radius: 20px;
  width: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
