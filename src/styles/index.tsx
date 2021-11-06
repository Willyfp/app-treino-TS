import { FlatList } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styled, { css } from 'styled-components/native';
import {
  BackgroundInterface,
  ButtonSubmitProps,
  InterfaceText,
} from '../types/styled';

export const Background = styled.View<BackgroundInterface>`
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextDefault = styled.Text<InterfaceText>`
  color: ${({ theme, color }) => color || theme.colors.default};
  font-size: ${({ fontSize }) => fontSize || 40}px;
  font-weight: 700;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: 80%;
    `}
  margin-vertical: ${({ marginVertical }) => marginVertical || 0}px;
`;

export const ButtonSubmit = styled.TouchableOpacity<ButtonSubmitProps>`
  background-color: ${({ theme }) => theme.colors.button};
  padding: 10px;
  width: ${({ width }) => width || '60%'};
  margin-vertical: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const AlignCenter = styled.View`
  padding-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const ViewRow = styled.View`
  flex-direction: row;
`;

export const ButtonDefault = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 75px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ViewCardDefault = styled.View`
  background-color: ${({ theme }) => theme.colors.text};
  elevation: 6;
  margin-bottom: 15px;
  height: 110px;
  width: 370px;
  border-radius: 5px;
  padding-horizontal: 10px;
  align-items: center;
  flex-direction: row;
`;

export const ViewButtonsCard = styled.View`
  margin-left: 20%;
  align-items: center;
`;

export const IconCard = styled(FontAwesome5Icon)`
  margin-top: 10px;
`;

export const CenteredScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  width: 100%;
`;
