import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import { schemaRegister } from '../../schemas/schemaRegister';
import { Background, ButtonSubmit, TextDefault } from '../../styles';
import { FormRegister } from '../../types/forms';
import { connect, ConnectedProps } from 'react-redux';
import { Creators as authActions } from '../../store/reducers/auth';

const mapDispatchToProps = {
  registerRequest: authActions.registerRequest,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Register({ registerRequest }: PropsFromRedux) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({ resolver: yupResolver(schemaRegister) });

  const onSubmit = handleSubmit((data: FormRegister) => registerRequest(data));

  return (
    <Background>
      <TextDefault marginVertical={20}>Registro</TextDefault>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={'Nome completo'}
            iconName={'user'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errors={errors.name?.message}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={'Telefone'}
            iconName={'phone'}
            type={'cel-phone'}
            isMasked
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errors={errors.phone?.message}
          />
        )}
        name="phone"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={'Email'}
            iconName={'at'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errors={errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={'Senha'}
            iconName={'lock'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errors={errors.password?.message}
            secureTextEntry
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={'Confirmar senha'}
            iconName={'check-double'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errors={errors.confirmPassword?.message}
            secureTextEntry
          />
        )}
        name="confirmPassword"
      />

      <ButtonSubmit onPress={onSubmit}>
        <TextDefault fontSize={20}>REGISTRAR</TextDefault>
      </ButtonSubmit>
    </Background>
  );
}

export default connector(Register);
