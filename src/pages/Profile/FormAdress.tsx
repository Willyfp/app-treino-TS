import React from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useTheme } from 'styled-components';
import TextInput from '../../components/TextInput';
import { AlignCenter, TextDefault, ViewRow } from '../../styles';
import { ViewAdress } from './styles';

const FormAddress = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { colors } = useTheme();

  return (
    <ViewAdress>
      <AlignCenter>
        <TextDefault color={colors.button} fontSize={20}>
          Endereço:
        </TextDefault>
        <ViewRow>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                width={'53%'}
                color={colors.primary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Rua"
                placeholderTextColor={colors.button}
                iconName={'road'}
                errors={errors.street?.message}
              />
            )}
            name="street"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                width={'35%'}
                color={colors.primary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Número"
                placeholderTextColor={colors.button}
                iconName={'map-marker-alt'}
                errors={errors.streetNumber?.message}
              />
            )}
            name="streetNumber"
          />
        </ViewRow>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              color={colors.primary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Complemento"
              placeholderTextColor={colors.button}
              iconName={'building'}
              errors={errors.complement?.message}
            />
          )}
          name="complement"
        />

        <ViewRow>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                width={'53%'}
                color={colors.primary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Cidade"
                placeholderTextColor={colors.button}
                iconName={'city'}
                errors={errors.city?.message}
              />
            )}
            name="city"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                width={'35%'}
                color={colors.primary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Estado"
                placeholderTextColor={colors.button}
                iconName={'map-marked-alt'}
                errors={errors.state?.message}
              />
            )}
            name="state"
          />
        </ViewRow>
      </AlignCenter>
    </ViewAdress>
  );
};

export default FormAddress;
