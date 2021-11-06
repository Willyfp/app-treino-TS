import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../../components/Header';
import ListDependents from '../../components/ListDependents';
import { RootState } from '../../store/reducers';
import { ButtonDefault, TextDefault } from '../../styles';
import ModalDependents from './ModalDependents';
import isEmpty from 'lodash/isEmpty';

const mapStateToProps = ({ dependentsReducer }: RootState) => ({
  persistedItem: dependentsReducer.getIn(['persistedItem']),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Dependents({ persistedItem }: PropsFromRedux) {
  const [visible, setVisible] = useState<boolean>(false);

  const hasProduct = !isEmpty(persistedItem);

  useEffect(() => {
    hasProduct && openModal();
  }, [persistedItem]);

  function closeModal() {
    setVisible(false);
  }

  function openModal() {
    setVisible(true);
  }

  return (
    <>
      <Header title={'Dependentes'} name={'Dependents'} iconName={'users'} />
      <ListDependents />
      <ButtonDefault onPress={openModal}>
        <TextDefault fontSize={25}>Adicionar</TextDefault>
      </ButtonDefault>

      <ModalDependents visible={visible} onRequestClose={closeModal} />
    </>
  );
}

export default connector(Dependents);
