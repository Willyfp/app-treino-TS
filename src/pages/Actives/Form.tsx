import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTheme } from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { MaskService } from 'react-native-masked-text';
import TextInput from '../../components/TextInput';
import { AlignCenter } from '../../styles';
import { RootState } from '../../store/reducers';
import { connect, ConnectedProps } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { ButtonBottomSheet } from '../../components/ImageBottomSheet/styles';
import { TextButton } from '../../components/GlobalModal/styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FormSeller from './FormSeller';

const mapStateToProps = ({ activesReducer }: RootState) => ({
  persistedItem: activesReducer.getIn(['persistedItem']),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Form = ({ persistedItem }: PropsFromRedux) => {
  const { colors } = useTheme();

  const hasProduct = !isEmpty(persistedItem);

  async function openPicker() {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
      });
      setValue('document', res.fileCopyUri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const watchDocument = watch('document', '');

  useEffect(() => {
    if (hasProduct && persistedItem.sellerCPF && persistedItem.price) {
      const sellerCPF = MaskService.toMask('cpf', persistedItem.sellerCPF, {});
      const price = MaskService.toMask('money', persistedItem.price, {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$',
      });

      setValue('assetName', persistedItem.assetName);
      setValue('buyDate', persistedItem.buyDate);
      setValue('sellerName', persistedItem.sellerName);
      setValue('document', persistedItem.document);
      setValue('sellerCPF', sellerCPF);
      setValue('price', price);
    }
  }, [persistedItem]);

  return (
    <AlignCenter>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            color={colors.text}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            iconName={'home'}
            placeholder="Tipo do ativo"
            placeholderTextColor={colors.text}
            errors={errors.assetName?.message}
          />
        )}
        name="assetName"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            color={colors.text}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Data da compra"
            isMasked={true}
            errors={errors.buyDate?.message}
            placeholderTextColor={colors.text}
            iconName={'calendar-alt'}
          />
        )}
        name="buyDate"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            color={colors.text}
            placeholderTextColor={colors.text}
            iconName={'dollar-sign'}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Preço do ativo"
            isMasked={true}
            errors={errors.price?.message}
          />
        )}
        name="price"
      />

      <FormSeller />

      <ButtonBottomSheet color={colors.primary} onPress={openPicker}>
        <TextButton color={colors.text}>
          <FontAwesome5Icon name={'file'} size={20} color={colors.text} />
          {'  '}
          {watchDocument ? 'Documento adicionado' : 'Adicionar Documento'}
        </TextButton>
      </ButtonBottomSheet>
    </AlignCenter>
  );
};

export default connector(Form);
