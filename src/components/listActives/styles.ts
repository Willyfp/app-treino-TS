import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { IActives } from '../../types/datas';

export const FlatListActives = styled(
  FlatList as new () => FlatList<IActives>,
).attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  padding-top: 80px;
  flex: 1;
`;
