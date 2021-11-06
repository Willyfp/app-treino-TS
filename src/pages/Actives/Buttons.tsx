import React from 'react';
import { useFormContext } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import { ButtonModal, TextButton } from '../../components/GlobalModal/styles';
import { IActives } from '../../types/datas';
import { Creators as ActivesActions } from '../../store/reducers/Actives';
import { RootState } from '../../store/reducers';
import isEmpty from 'lodash/isEmpty';

const mapStateToProps = ({ activesReducer }: RootState) => ({
  persistedItem: activesReducer.getIn(['persistedItem']),
  error: activesReducer.getIn(['error']),
});

const mapDispatchToProps = {
  createActive: ActivesActions.createActive,
  editActive: ActivesActions.editActive,
  persistItem: ActivesActions.persistItemActive,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ButtonsModal extends PropsFromRedux {
  setVisible(): void;
}

const Buttons = ({
  persistedItem,
  error,
  setVisible,
  persistItem,
  createActive,
  editActive,
}: ButtonsModal) => {
  const { colors } = useTheme();

  const { handleSubmit, reset } = useFormContext();

  const hasProduct = !isEmpty(persistedItem);

  const onSubmit = (data: IActives) => {
    if (hasProduct) {
      editActive(data);
    } else {
      createActive(data);
    }

    if (!error) {
      reset();
      persistItem({});
      setVisible();
    }
  };

  function cancel() {
    reset();
    persistItem({});
    setVisible();
  }

  return (
    <>
      <ButtonModal onPress={handleSubmit(onSubmit)}>
        <TextButton color={colors.primary}>
          {hasProduct ? 'Editar' : 'Criar'}
        </TextButton>
      </ButtonModal>
      <ButtonModal color={colors.error} onPress={cancel}>
        <TextButton color={colors.text}>Cancelar</TextButton>
      </ButtonModal>
    </>
  );
};

export default connector(Buttons);
