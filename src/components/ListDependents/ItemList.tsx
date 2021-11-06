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
import { Creators as dependentsActions } from '../../store/reducers/Dependents';
import { Creators as modalActions } from '../../store/reducers/modalReducer';
import { ButtonCard } from './styles';

const mapDispatchToProps = {
  persistItem: dependentsActions.persistItemDependent,
  removeDependent: dependentsActions.removeDependent,
  setModal: modalActions.setModal,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface DependentsProps extends PropsFromRedux {
  data: {
    id: string;
    name?: string;
    bornDate?: string;
    cpf?: string;
  };
}

const ItemList = ({
  data,
  persistItem,
  removeDependent,
  setModal,
}: DependentsProps) => {
  const { colors } = useTheme();

  function handleEdit() {
    persistItem(data);
  }

  function handleRemove() {
    setModal({
      functionModal: () => removeDependent(data),
      visible: true,
      title: 'Remover',
      message: 'Deseja remover o dependente?',
      type: 'confirm',
    });
  }

  return (
    <ViewCardDefault>
      <View>
        <TextDefault fontSize={18} color={colors.primary}>
          {data.name}
        </TextDefault>
        <TextDefault fontSize={15} color={colors.primary}>
          Data de Nascimento: {data.bornDate}
        </TextDefault>
        <TextDefault fontSize={15} color={colors.primary}>
          CPF: {data.cpf}
        </TextDefault>
      </View>
      <ViewButtonsCard>
        <ButtonCard onPress={handleEdit}>
          <IconCard name={'edit'} size={18} color={colors.primary} />
          <TextDefault fontSize={12} color={colors.primary}>
            Editar
          </TextDefault>
        </ButtonCard>

        <ButtonCard onPress={handleRemove}>
          <IconCard name={'trash'} size={18} color={colors.error} />
          <TextDefault fontSize={12} color={colors.primary}>
            Remover
          </TextDefault>
        </ButtonCard>
      </ViewButtonsCard>
    </ViewCardDefault>
  );
};

export default connector(ItemList);
