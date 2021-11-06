import yup from '../index';
const errorRequired = 'Campo obrigatório!';

export type TypesEdit = {
  name: string;
  photo?: string;
};

export const schemaEdit = yup.object().shape({
  name: yup.string().required(errorRequired).min(3, 'Mínimo de 3 caracteres'),
  phone: yup.string().required(errorRequired),
  email: yup.string().email('Insira um email válido!').required(errorRequired),
  bornDate: yup.string().notRequired(),
  street: yup.string().notRequired(),
  streetNumber: yup.string().notRequired(),
  complement: yup.string().notRequired(),
  city: yup.string().notRequired(),
  photo: yup.string().notRequired(),
  state: yup.string().max(2, 'use somente a sigla').notRequired(),
});
