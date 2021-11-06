import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Dependents } from '../../types/datas';

export const FlatListDependents = styled(
  FlatList as new () => FlatList<Dependents>,
).attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  padding-top: 80px;
  flex: 1;
`;

export const ButtonCard = styled.TouchableOpacity`
  align-items: center;
`;
