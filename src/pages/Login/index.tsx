import { useNavigation } from '@react-navigation/core';
import React, { Reducer, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import TextInput from '../../components/TextInput';
import { Background, ButtonSubmit, TextDefault } from '../../styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '../../schemas/schemaLogin';
import { FormLogin } from '../../types/forms';
import { Creators as authActions } from '../../store/reducers/auth';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers';

const mapDispatchToProps = {
  loginRequest: authActions.loginRequest,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Login({ loginRequest }: PropsFromRedux) {
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: yupResolver(schemaLogin) });

  function goToRegister() {
    navigate('Register');
  }

  const onSubmit = handleSubmit((data: FormLogin) => loginRequest(data));

  return (
    <Background>
      <TextDefault>Login</TextDefault>

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
            secureTextEntry
            errors={errors.password?.message}
          />
        )}
        name="password"
      />

      <ButtonSubmit onPress={onSubmit}>
        <TextDefault fontSize={20}>Entrar</TextDefault>
      </ButtonSubmit>

      <TouchableOpacity onPress={goToRegister}>
        <TextDefault fontSize={17}>Ainda não tenho uma conta</TextDefault>
      </TouchableOpacity>
    </Background>
  );
}

export default connector(Login);
