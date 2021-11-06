import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { ButtonModalProps, TextButtonProps } from '../../types/styled';

export const CenteredView = styled.View`
  background-color: transparent;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.modal};
  border-radius: 20px;
  padding: 40px;
`;

export const ModalTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  padding: 15px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalMessage = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const ButtonModal = styled.TouchableOpacity<ButtonModalProps>`
  border-radius: 20px;
  padding: 10px;
  margin-top: 15px;
  margin: 10px;
  background-color: ${({ theme, color }) => color || theme.colors.text};
`;

export const TextButton = styled.Text<TextButtonProps>`
  color: ${({ theme, color }) => color || theme.colors.primary};
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

export const TransparentView = styled(Animated.View)`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: transparent;
`;

export const BottomView = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.bottomSheet};
  align-items: center;
  padding: 15px;
  width: 100%;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;
