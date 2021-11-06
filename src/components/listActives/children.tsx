import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { TextDefault } from '../../styles';
import { IActives } from '../../types/datas';
import { TextButton } from '../GlobalModal/styles';
import { ButtonBottomSheet } from '../ImageBottomSheet/styles';
import { Creators as modalActions } from '../../store/reducers/modalReducer';
import { Creators as activesActions } from '../../store/reducers/Actives';
import { connect, ConnectedProps } from 'react-redux';
import FileViewer from 'react-native-file-viewer';

const mapDispatchToProps = {
  setModal: modalActions.setModal,
  setBottomSheet: modalActions.setBottomSheet,
  removeActive: activesActions.removeActive,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface MoreProps extends PropsFromRedux {
  data: IActives;
}

const More = ({ data, setModal, removeActive, setBottomSheet }: MoreProps) => {
  const { colors } = useTheme();

  function handleRemove() {
    setBottomSheet({ visible: false });
    setModal({
      functionModal: () => removeActive(data),
      visible: true,
      title: 'Remover',
      message: 'Deseja remover o dependente?',
      type: 'confirm',
    });
  }

  function openDocument() {
    FileViewer.open(data.document);
  }

  return (
    <>
      <TextDefault fontSize={20}>
        Nome do vendedor: {data.sellerName}
      </TextDefault>
      <TextDefault fontSize={20}>CPF do vendedor: {data.sellerCPF}</TextDefault>

      <ButtonBottomSheet onPress={openDocument}>
        <TextButton color={colors.primary}>
          <FontAwesome5Icon name={'file'} size={20} color={colors.primary} />
          {'  '}Ver documento
        </TextButton>
      </ButtonBottomSheet>

      <ButtonBottomSheet onPress={handleRemove}>
        <TextButton color={colors.error}>
          <FontAwesome5Icon name={'trash'} size={20} color={colors.error} />
          {'  '}Remover
        </TextButton>
      </ButtonBottomSheet>
    </>
  );
};

export default connector(More);
