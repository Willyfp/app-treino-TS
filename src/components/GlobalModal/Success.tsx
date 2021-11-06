import React from 'react';
import { View } from 'react-native';
import { ButtonModal, TextButton } from './styles';
import { Creators as modalActions } from '../../store/reducers/modalReducer';
import { RootState } from '../../store/reducers';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = ({ modalReducer }: RootState) => ({
  type: modalReducer.getIn(['modal', 'type']),
});

const mapDispatchToProps = {
  setModal: modalActions.setModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Success = ({ type, setModal }: PropsFromRedux) => {
  function ok() {
    setModal({ visible: false });
  }

  if (type === 'success') {
    return (
      <View>
        <ButtonModal onPress={ok}>
          <TextButton>Ok</TextButton>
        </ButtonModal>
      </View>
    );
  }

  return null;
};

export default connector(Success);
