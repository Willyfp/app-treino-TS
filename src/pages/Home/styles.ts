import { Animated } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

export const ViewAbsolute = styled.View`
  flex-direction: row;
  position: absolute;
  top: 50px;
`;

export const ViewProfile = styled(Animated.View)`
  text-align: left;
  height: 250px;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 70px;
`;

export const Icon = styled(FontAwesome5Icon)`
  margin-horizontal: 20px;
`;
