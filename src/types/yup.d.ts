import { AnyObject, Maybe } from 'yup/lib/types';
import { MASKSERVICEYUP } from './forms';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > {
    isValidMaskService({ type, options }: MASKSERVICEYUP): this;
    isMoneyBiggerThan(conditionValue: number): this;
    isValidMaskServiceCNPJorCPF(): this;
  }
}
