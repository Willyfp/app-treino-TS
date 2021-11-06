import { RootStackParamList } from './global';

export interface User {
  id: number;
  photo?: string;
  name?: string;
  bornDate?: string;
  phone?: string;
  email?: string;
  ocupationType?: string;
  ocupation?: string;
  adress?: {
    street?: string;
    streetNumber?: number;
    complement?: string;
    city?: string;
    state?: string;
  };
  password?: string;
  confirmPassword?: string;
}

export interface Dependents {
  id: string;
  name: string;
  bornDate: string;
  cpf: string;
}

export interface Favorite {
  id: number;
  name?: string;
  iconName?: string;
  title?: string;
}

export interface ICards {
  id: number;
  value?: string;
  type: keyof RootStackParamList;
  name: string;
  quantity: number;
  icon: string;
}

export interface IActives {
  id: string;
  assetName: string;
  buyDate: string;
  price: string;
  document: string;
  sellerName: string;
  sellerCPF: string;
}
