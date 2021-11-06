import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

export const ViewHeader = styled.View`
  width: 100%;
  z-index: 1;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconHeader = styled(FontAwesome5Icon)`
  margin-horizontal: 15px;
`;
