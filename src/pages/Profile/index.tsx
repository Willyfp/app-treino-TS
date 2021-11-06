import { yupResolver } from '@hookform/resolvers/yup';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import Header from '../../components/Header';
import { schemaEdit, TypesEdit } from '../../schemas/schemaEdit';
import { RootState } from '../../store/reducers';
import { TextDefault } from '../../styles';
import FormAddress from './FormAdress';
import FormPessoal from './FormPessoal';
import { ViewPhoto, ViewProfileUnanimated } from './styles';
import Submit from './Submit';
import { Creators as modalActions } from '../../store/reducers/modalReducer';
import ImageBottomSheet from '../../components/ImageBottomSheet';
import Avatar from '../../components/Avatar';

const mapStateToProps = ({ authReducer }: RootState) => ({
  logedUser: authReducer.getIn(['user']),
});

const mapDispatchToProps = {
  setBottomSheet: modalActions.setBottomSheet,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Profile({ logedUser, setBottomSheet }: PropsFromRedux) {
  const { colors } = useTheme();

  const methods = useForm<TypesEdit>({ resolver: yupResolver(schemaEdit) });

  const { setValue, clearErrors, watch } = methods;

  function openOptions() {
    setBottomSheet({
      visible: true,
      child: <ImageBottomSheet setValue={setValue} />,
    });
  }

  useFocusEffect(
    useCallback(() => {
      if (logedUser) {
        clearErrors();
        Object.entries(logedUser).map(([name, value]) => {
          if (value !== undefined) {
            setValue(name as keyof TypesEdit, value.toString());
          }
        });
      }
    }, [logedUser]),
  );

  const watchPhoto = watch('photo', '');

  return (
    <>
      <Header title={'Perfil'} name={'Profile'} isProfile />
      <ScrollView
        contentContainerStyle={{ backgroundColor: colors.backgroundScroll }}>
        <ViewProfileUnanimated>
          <TouchableOpacity onPress={openOptions}>
            <Avatar value={watchPhoto} />
          </TouchableOpacity>
          <TouchableOpacity disabled>
            <TextDefault fontSize={30} maxWidth>
              {logedUser?.name + ' '}

              <FontAwesome5Icon
                name={'edit'}
                solid
                size={30}
                color={colors.text}
              />
            </TextDefault>
          </TouchableOpacity>
        </ViewProfileUnanimated>
        <FormProvider {...methods}>
          <FormPessoal />
          <FormAddress />
          <Submit />
        </FormProvider>
      </ScrollView>
    </>
  );
}

export default connector(Profile);
