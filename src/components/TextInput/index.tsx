import React from 'react';
import { Text, TextInputProps } from 'react-native';
import { TextInputMaskProps } from 'react-native-masked-text';
import { useTheme } from 'styled-components';
import { InputType } from '../../types/forms';
import { IconInput, Input, InputMasked, ViewInput } from './styles';

const TextInput = ({
  iconName,
  errors,
  isMasked,
  color,
  verticalMargin,
  width,
  ...rest
}: InputType) => {
  const { colors } = useTheme();

  return (
    <>
      <ViewInput color={color} verticalMargin={verticalMargin} width={width}>
        <IconInput
          name={iconName || 'interrogative'}
          solid
          size={20}
          color={color || colors.text + 90}
        />
        {isMasked ? (
          <InputMasked {...(rest as TextInputMaskProps)} color={color} />
        ) : (
          <Input {...(rest as TextInputProps)} color={color} />
        )}
      </ViewInput>
      <Text> {errors && errors} </Text>
    </>
  );
};

export default TextInput;
