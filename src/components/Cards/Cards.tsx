import React from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components';
import { ICards } from '../../types/datas';
import { IconCard, ScrollCards, ViewCard } from './styles';
import isEmpty from 'lodash/isEmpty';
import { TextDefault } from '../../styles';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../types/global';

interface CardsProps {
  scrollY: Animated.Value;
  privacity: boolean;
  data?: Array<ICards>;
}

const Cards = ({ scrollY, data, privacity }: CardsProps) => {
  const { colors } = useTheme();

  const { navigate } = useNavigation();

  const hasData = !isEmpty(data);

  const scroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  return (
    <ScrollCards showsVerticalScrollIndicator={false} onScroll={scroll}>
      {hasData &&
        data &&
        data.map((item) => (
          <ViewCard key={item.id} onPress={() => navigate(item.type)}>
            <IconCard name={item.icon} size={100} color={colors.primary + 40} />
            <TextDefault fontSize={25} color={colors.primary}>
              {item.name}
            </TextDefault>

            <TextDefault fontSize={20} color={colors.primary}>
              Quantidade: {item.quantity}
            </TextDefault>
            <TextDefault fontSize={20} color={colors.primary}>
              {item.value && 'Valor: '}
              {item.value && privacity ? '*****' : item.value}
            </TextDefault>
          </ViewCard>
        ))}
    </ScrollCards>
  );
};

export default Cards;
