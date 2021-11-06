import { Animated } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

export const ViewCard = styled.TouchableOpacity`
  height: 140px;
  justify-content: center;
  padding-left: 15px;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.text};
  elevation: 2;
  border-radius: 30px;
  margin-vertical: 15px;
`;

export const IconCard = styled(FontAwesome5Icon)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const ScrollCards = styled(Animated.ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingTop: 380,
    alignItems: 'center',
  },
}))`
  z-index: -1;
`;
