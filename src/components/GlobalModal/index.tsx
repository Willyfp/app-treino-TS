import React from 'react';
import { Modal } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers';
import Confirm from './Confirm';
import { CenteredView, ModalMessage, ModalTitle, ModalView } from './styles';
import Success from './Success';

const mapStateToProps = ({ modalReducer }: RootState) => ({
  title: modalReducer.getIn(['modal', 'title']),
  message: modalReducer.getIn(['modal', 'message']),
  visible: modalReducer.getIn(['modal', 'visible']),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const GlobalModal = ({ title, message, visible }: PropsFromRedux) => {
  return (
    <Modal visible={visible} transparent>
      <CenteredView>
        <ModalView>
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <Confirm />
          <Success />
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default connector(GlobalModal);
