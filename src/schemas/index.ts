import * as yup from 'yup';
import {
  MaskService,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { MASKSERVICE, MASKSERVICEYUP } from '../types/forms';

export function isValidFn({ type, value, options }: MASKSERVICE): boolean {
  return MaskService.isValid(type, value, options);
}

export const isValidFnResult = (
  type: TextInputMaskTypeProp,
  value: string | undefined,
  options?: TextInputMaskOptionProp,
): boolean => {
  if (!value) {
    return false;
  }

  return isValidFn({ type, value, options });
};

yup.addMethod(
  yup.string,
  'isValidMaskService',
  function ({ type, options }: MASKSERVICEYUP) {
    return this.test('isValidMaskService', '${path} inválido', (value) => {
      if (value) {
        return isValidFnResult(type, value, options);
      }

      return false;
    });
  },
);

export default yup;
