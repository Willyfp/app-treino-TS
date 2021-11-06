import { TextInputProps } from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

export type FormLogin = {
  email: string;
  password: string;
};

export type FormRegister = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface BaseInterface {
  iconName?: string;
  errors?: string;
  color?: string;
  isMasked?: boolean;
  verticalMargin?: number;
  width?: string;
}

export type MASKSERVICEYUP = {
  type: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
};

export type MASKSERVICE = {
  type: TextInputMaskTypeProp;
  value: string;
  options?: TextInputMaskOptionProp;
};

export type FormValues = {
  string: string;
  number: number;
  object: {
    number: number;
    boolean: boolean;
  };
  array: {
    string: string;
    boolean: boolean;
  }[];
};

export interface InputRef {}

export type InputType = BaseInterface & (TextInputMaskProps | TextInputProps);
