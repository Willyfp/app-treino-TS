import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTheme } from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { MaskService } from 'react-native-masked-text';
import TextInput from '../../components/TextInput';
import { AlignCenter } from '../../styles';
import { RootState } from '../../store/reducers';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = ({ dependentsReducer }: RootState) => ({
  persistedItem: dependentsReducer.getIn(['persistedItem']),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Form = ({ persistedItem }: PropsFromRedux) => {
  const { colors } = useTheme();

  const hasProduct = !isEmpty(persistedItem);

  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (hasProduct && persistedItem.cpf) {
      const cpf = MaskService.toMask('cpf', persistedItem.cpf, {});

      setValue('name', persistedItem.name);
      setValue('bornDate', persistedItem.bornDate);
      setValue('cpf', cpf);
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
            iconName={'user'}
            placeholder="Nome do Dependente"
            placeholderTextColor={colors.text}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            isMasked={true}
            color={colors.text}
            type={'cpf'}
            onBlur={onBlur}
            iconName={'id-card'}
            onChangeText={onChange}
            value={value}
            placeholder="CPF do dependente"
            placeholderTextColor={colors.text}
            errors={errors.cpf?.message}
          />
        )}
        name="cpf"
        defaultValue=""
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
            placeholder="Data de Nascimento"
            isMasked={true}
            errors={errors.bornDate?.message}
            placeholderTextColor={colors.text}
            iconName={'calendar-alt'}
          />
        )}
        name="bornDate"
        defaultValue=""
      />
    </AlignCenter>
  );
};

export default connector(Form);
