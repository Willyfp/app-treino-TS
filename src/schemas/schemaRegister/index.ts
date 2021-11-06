import yup from '..';

const errorRequired = 'Campo obrigatório!';

export const schemaRegister = yup.object().shape({
  name: yup.string().required(errorRequired).min(3, 'Mínimo de 3 caracteres'),
  phone: yup.string().required(errorRequired),
  email: yup.string().email('Insira um email válido!').required(errorRequired),
  password: yup
    .string()
    .required(errorRequired)
    .min(8, 'A senha deve ter no mínimo 8 caracteres!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não são compatíveis!')
    .required(errorRequired),
});
