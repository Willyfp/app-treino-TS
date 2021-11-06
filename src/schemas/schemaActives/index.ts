import yup from '../index';

export interface ActiveFields {
  assetName?: string;
  buyDate?: string;
  price?: string;
  document?: string;
  sellerName?: string;
  sellerCPF?: string;
}

const schemaActive: yup.SchemaOf<ActiveFields> = yup.object().shape({
  assetName: yup.string().required(),
  price: yup.string().required(),
  sellerName: yup.string().required(),
  document: yup.string().notRequired(),
  buyDate: yup
    .string()
    .required()
    .isValidMaskService({
      type: 'datetime',
      options: { format: 'DD/MM/YYYY' },
    }),
  sellerCPF: yup.string().required().isValidMaskService({ type: 'cpf' }),
});

export default schemaActive;
