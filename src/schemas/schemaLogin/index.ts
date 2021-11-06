import yup from '..';

const errorRequired = 'Campo obrigatório!';

export const schemaLogin = yup.object().shape({
  email: yup.string().email('Insira um email válido!').required(errorRequired),
  password: yup.string().required(errorRequired),
});
