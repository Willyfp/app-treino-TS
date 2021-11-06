import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTheme } from 'styled-components';
import TextInput from '../../components/TextInput';

const FormSeller = () => {
  const { colors } = useTheme();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            color={colors.text}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            iconName={'user'}
            placeholder="Nome do vendedor"
            placeholderTextColor={colors.text}
            errors={errors.sellerName?.message}
          />
        )}
        name="sellerName"
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
            placeholder="CPF do Vendedor"
            placeholderTextColor={colors.text}
            errors={errors.sellerCPF?.message}
          />
        )}
        name="sellerCPF"
      />
    </>
  );
};

export default FormSeller;
