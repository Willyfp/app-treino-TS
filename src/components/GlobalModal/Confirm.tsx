import React from 'react';
import { useTheme } from 'styled-components';
import isFunction from 'lodash/isFunction';
import { View } from 'react-native';
import { ButtonModal, TextButton } from './styles';
import { RootState } from '../../store/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Creators as modalActions } from '../../store/reducers/modalReducer';

const mapStateToProps = ({ modalReducer }: RootState) => ({
  functionModal: modalReducer.getIn(['modal', 'functionModal']),
  type: modalReducer.getIn(['modal', 'type']),
});

const mapDispatchToProps = {
  setModal: modalActions.setModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Confirm = ({ type, setModal, functionModal }: PropsFromRedux) => {
  const { colors } = useTheme();

  function accept() {
    if (isFunction(functionModal)) {
      setModal({ type: 'success', confirm: true });
      functionModal();
    }
  }

  function refuse() {
    setModal({ visible: false });
  }

  if (type === 'confirm') {
    return (
      <View>
        <ButtonModal onPress={accept}>
          <TextButton>Sim</TextButton>
        </ButtonModal>

        <ButtonModal onPress={refuse} color={colors.error}>
          <TextButton color={colors.text}>Não</TextButton>
        </ButtonModal>
      </View>
    );
  }

  return null;
};

export default connector(Confirm);
