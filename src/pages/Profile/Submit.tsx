import React from 'react';
import { useFormContext } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { AlignCenter, ButtonSubmit, TextDefault } from '../../styles';
import { User } from '../../types/datas';
import { Creators as authActions } from '../../store/reducers/auth';
import { Creators as modalActions } from '../../store/reducers/modalReducer';

const mapDispatchToProps = {
  editUserRequest: authActions.editUserRequest,
  setModal: modalActions.setModal,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Submit = ({ editUserRequest, setModal }: PropsFromRedux) => {
  const { handleSubmit } = useFormContext();

  function openConfirm() {
    setModal({
      functionModal: handleSubmit(onSubmit),
      visible: true,
      title: 'Salvar',
      message: 'Deseja salvar as alterações?',
      type: 'confirm',
    });
  }

  const onSubmit = (data: User) => editUserRequest(data);

  return (
    <AlignCenter>
      <ButtonSubmit width={'90%'} onPress={openConfirm}>
        <TextDefault fontSize={20}>Salvar</TextDefault>
      </ButtonSubmit>
    </AlignCenter>
  );
};

export default connector(Submit);
