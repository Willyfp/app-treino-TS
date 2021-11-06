import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { ButtonDefault, TextDefault } from '../../styles';
import ListActives from '../../components/listActives';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers';
import isEmpty from 'lodash/isEmpty';
import ModalActives from './ModalActives';

const mapStateToProps = ({ activesReducer }: RootState) => ({
  persistedItem: activesReducer.getIn(['persistedItem']),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Actives({ persistedItem }: PropsFromRedux) {
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
      <Header title={'Ativos'} name={'Actives'} iconName={'car'} />

      <ListActives />

      <ButtonDefault onPress={openModal}>
        <TextDefault fontSize={25}>Adicionar</TextDefault>
      </ButtonDefault>

      <ModalActives visible={visible} onRequestClose={closeModal} />
    </>
  );
}

export default connector(Actives);
