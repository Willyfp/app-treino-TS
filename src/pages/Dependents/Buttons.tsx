import React from 'react';
import { useFormContext } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import { ButtonModal, TextButton } from '../../components/GlobalModal/styles';
import { Dependents } from '../../types/datas';
import { Creators as dependentsActions } from '../../store/reducers/Dependents';
import { RootState } from '../../store/reducers';
import isEmpty from 'lodash/isEmpty';

const mapStateToProps = ({ dependentsReducer }: RootState) => ({
  persistedItem: dependentsReducer.getIn(['persistedItem']),
  error: dependentsReducer.getIn(['error']),
});

const mapDispatchToProps = {
  createDependent: dependentsActions.createDependent,
  editDependent: dependentsActions.editDependent,
  persistItem: dependentsActions.persistItemDependent,
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
  createDependent,
  editDependent,
}: ButtonsModal) => {
  const { colors } = useTheme();

  const { handleSubmit, reset } = useFormContext();

  const hasProduct = !isEmpty(persistedItem);

  const onSubmit = (data: Dependents) => {
    if (hasProduct) {
      editDependent(data);
    } else {
      createDependent(data);
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
