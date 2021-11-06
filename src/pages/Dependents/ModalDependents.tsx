import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Modal, ModalProps } from 'react-native';
import { useTheme } from 'styled-components';
import { CenteredView, ModalView } from '../../components/GlobalModal/styles';
import schemaDependent from '../../schemas/schemaDependents';
import { Background } from '../../styles';
import Buttons from './Buttons';
import Form from './Form';

const ModalDependents = ({ visible, onRequestClose }: ModalProps) => {
  const { colors } = useTheme();

  const methods = useForm({ resolver: yupResolver(schemaDependent) });

  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      onRequestClose={onRequestClose}>
      <Background color={colors.modal}>
        <CenteredView>
          <ModalView>
            <FormProvider {...methods}>
              <Form />
              <Buttons
                setVisible={onRequestClose ? onRequestClose : () => {}}
              />
            </FormProvider>
          </ModalView>
        </CenteredView>
      </Background>
    </Modal>
  );
};

export default ModalDependents;
