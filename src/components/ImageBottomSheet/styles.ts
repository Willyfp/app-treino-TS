import styled from 'styled-components/native';
import { ButtonBottomSheetProps } from '../../types/styled';

export const ButtonBottomSheet = styled.TouchableOpacity<ButtonBottomSheetProps>`
  border-radius: 20px;
  width: 90%;
  padding: 10px;
  margin-top: 15px;
  margin: 10px;
  background-color: ${({ theme, color }) => color || theme.colors.text};
`;
