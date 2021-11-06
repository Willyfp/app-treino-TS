import yup from '../index';

export type FieldsDependents = {
  name?: string;
  cpf?: string;
  bornDate?: string;
};

const schemaDependent: yup.SchemaOf<FieldsDependents> = yup.object().shape({
  name: yup.string().required(),
  cpf: yup.string().required().isValidMaskService({ type: 'cpf' }),
  bornDate: yup
    .string()
    .required()
    .isValidMaskService({
      type: 'datetime',
      options: { format: 'DD/MM/YYYY' },
    }),
});

export default schemaDependent;
