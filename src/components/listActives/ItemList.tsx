import React from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import {
  IconCard,
  TextDefault,
  ViewButtonsCard,
  ViewCardDefault,
} from '../../styles';
import { IActives } from '../../types/datas';
import { ButtonCard } from '../ListDependents/styles';
import More from './children';
import { Creators as bottomSheetActions } from '../../store/reducers/modalReducer';
import { Creators as activesActions } from '../../store/reducers/Actives';

const mapDispatchToProps = {
  setBottomSheet: bottomSheetActions.setBottomSheet,
  persistItem: activesActions.persistItemActive,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ItemListProps extends PropsFromRedux {
  data: IActives;
}

const ItemList = ({ data, setBottomSheet, persistItem }: ItemListProps) => {
  const { colors } = useTheme();

  function handleEdit() {
    persistItem(data);
  }

  function openOptions() {
    setBottomSheet({
      visible: true,
      child: <More data={data} />,
    });
  }

  return (
    <ViewCardDefault>
      <View>
        <TextDefault fontSize={18} color={colors.primary}>
          {data.assetName}
        </TextDefault>
        <TextDefault fontSize={15} color={colors.primary}>
          Data de Nascimento: {data.buyDate}
        </TextDefault>
        <TextDefault fontSize={15} color={colors.primary}>
          Valor: {data.price}
        </TextDefault>
      </View>
      <ViewButtonsCard>
        <ButtonCard onPress={handleEdit}>
          <IconCard name={'edit'} size={18} color={colors.primary} />
          <TextDefault fontSize={12} color={colors.primary}>
            Editar
          </TextDefault>
        </ButtonCard>

        <ButtonCard onPress={openOptions}>
          <IconCard name={'arrow-circle-up'} size={18} color={colors.primary} />
          <TextDefault fontSize={12} color={colors.primary}>
            Ver mais
          </TextDefault>
        </ButtonCard>
      </ViewButtonsCard>
    </ViewCardDefault>
  );
};

export default connector(ItemList);
