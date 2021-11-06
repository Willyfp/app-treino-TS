import styled from 'styled-components/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInputMask } from 'react-native-masked-text';
import { BaseInterface } from '../../types/forms';
import { ViewTextInput } from '../../types/styled';

export const ViewInput = styled.View<ViewTextInput>`
  width: ${({ width }) => width || '90%'};
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ verticalMargin }) => verticalMargin || 10}px;
  border: 1px;
  border: ${({ theme, color }) => color || theme.colors.text}60;
  padding: 3px;
  border-radius: 15px;
`;

export const Input = styled.TextInput.attrs<BaseInterface>(
  ({ theme, color }) => ({
    placeholderTextColor: color || theme.colors.text + 80,
  }),
)<BaseInterface>`
  width: 100%;
  height: 100%;
  font-size: 17px;
  margin-horizontal: 15px;
  color: ${({ theme, color }) => color || theme.colors.text};
`;

export const InputMasked = styled(TextInputMask).attrs<BaseInterface>(
  ({ theme, color }) => ({
    placeholderTextColor: color || theme.colors.text + 80,
  }),
)<BaseInterface>`
  width: 100%;
  height: 100%;
  font-size: 17px;
  margin-horizontal: 15px;
  color: ${({ theme, color }) => color || theme.colors.text};
`;

export const IconInput = styled(FontAwesome5)`
  margin-horizontal: 15px;
`;
