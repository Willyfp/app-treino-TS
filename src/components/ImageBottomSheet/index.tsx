import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import { openCamera, openPicker } from '../../utils/Pickers';
import { TextButton } from '../GlobalModal/styles';
import { Creators as bottomSheetActions } from '../../store/reducers/modalReducer';
import { ButtonBottomSheet } from './styles';
import { UseFormSetValue } from 'react-hook-form';
import { TypesEdit } from '../../schemas/schemaEdit';

const mapDispatchToProps = {
  setBottomSheet: bottomSheetActions.setBottomSheet,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ImageChild extends PropsFromRedux {
  setValue: UseFormSetValue<TypesEdit>;
}

const ImageBottomSheet = ({ setBottomSheet, setValue }: ImageChild) => {
  const { colors } = useTheme();

  async function selectPhoto() {
    const res = await openPicker();
    {
      res && setValue('photo', res?.path);
    }
    setBottomSheet({ visible: false });
  }

  async function takePhoto() {
    const res = await openCamera();
    {
      res && setValue('photo', res?.path);
    }
    setBottomSheet({ visible: false });
  }

  async function removePhoto() {
    setValue('photo', '');
    setBottomSheet({ visible: false });
  }

  return (
    <>
      <ButtonBottomSheet onPress={takePhoto}>
        <TextButton>
          <FontAwesome5Icon name={'camera'} size={20} color={colors.primary} />
          {'  '}Tirar Foto
        </TextButton>
      </ButtonBottomSheet>

      <ButtonBottomSheet onPress={selectPhoto}>
        <TextButton>
          <FontAwesome5Icon name={'image'} size={25} color={colors.primary} />
          {'  '}Escolher da galeria
        </TextButton>
      </ButtonBottomSheet>

      <ButtonBottomSheet onPress={removePhoto}>
        <TextButton>
          <FontAwesome5Icon name={'trash'} size={20} color={colors.primary} />
          {'  '}Remover foto
        </TextButton>
      </ButtonBottomSheet>
    </>
  );
};

export default connector(ImageBottomSheet);
