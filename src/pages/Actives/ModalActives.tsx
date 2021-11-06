import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Modal, ModalProps, ScrollView } from 'react-native';
import { useTheme } from 'styled-components';
import { CenteredView, ModalView } from '../../components/GlobalModal/styles';
import schemaActive from '../../schemas/schemaActives';
import { Background, CenteredScrollView } from '../../styles';
import Buttons from './Buttons';
import Form from './Form';

const ModalActives = ({ visible, onRequestClose }: ModalProps) => {
  const { colors } = useTheme();

  const methods = useForm({ resolver: yupResolver(schemaActive) });

  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      onRequestClose={onRequestClose}>
      <Background color={colors.modal}>
        <CenteredView>
          <CenteredScrollView>
            <ModalView>
              <FormProvider {...methods}>
                <Form />
                <Buttons
                  setVisible={onRequestClose ? onRequestClose : () => {}}
                />
              </FormProvider>
            </ModalView>
          </CenteredScrollView>
        </CenteredView>
      </Background>
    </Modal>
  );
};

export default ModalActives;
