import React from 'react';
import { useFormContext, Controller, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import TextInput from '../../components/TextInput';
import { AlignCenter } from '../../styles';

const FormPessoal = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { colors } = useTheme();

  return (
    <AlignCenter>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            verticalMargin={1}
            color={colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nome"
            iconName={'user'}
            errors={errors.name?.message}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            verticalMargin={1}
            color={colors.primary}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Data de nascimento"
            isMasked={true}
            placeholderTextColor={colors.button}
            iconName={'calendar-alt'}
            errors={errors.bornDate?.message}
          />
        )}
        name="bornDate"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            verticalMargin={1}
            color={colors.primary}
            type={'cel-phone'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Telefone"
            placeholderTextColor={colors.button}
            iconName={'phone'}
            keyboardType="numeric"
            isMasked
            errors={errors.phone?.message}
          />
        )}
        name="phone"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            verticalMargin={1}
            color={colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            iconName={'at'}
            errors={errors.email?.message}
          />
        )}
        name="email"
      />
    </AlignCenter>
  );
};

export default FormPessoal;
