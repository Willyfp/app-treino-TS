import { AnyAction } from 'redux';
import { ImmutableObject } from 'seamless-immutable';

export interface InitalStateDependentsInterface {
  loading: boolean;
  success: boolean;
  data: object;
  persistedItem: Dependente;
  error?: Error;
}

export interface Dependente {
  id?: string;
  name?: string;
  bornDate?: string;
  cpf?: string;
}

export interface ListDependentsSuccess {
  (
    state: ImmutableObject<InitalStateDependentsInterface>,
    action: { type: 'LIST_DEPENDENTS_SUCCESS'; data: Dependente },
  ): ImmutableObject<InitalStateDependentsInterface>;
}

export interface ListDependentsFailed {
  (
    state: ImmutableObject<InitalStateDependentsInterface>,
    action: { type: 'LIST_DEPENDENTS_FAILED'; error: Error },
  ): ImmutableObject<InitalStateDependentsInterface>;
}

export interface PersistItemDependent {
  (
    state: ImmutableObject<InitalStateDependentsInterface>,
    action: { type: 'PERSIST_ITEM_DEPENDENT'; data: Dependente },
  ): ImmutableObject<InitalStateDependentsInterface>;
}

export interface TypesReducerDependents {
  LIST_DEPENDENTS_REQUEST: string;
  LIST_DEPENDENTS_SUCCESS: string;
  LIST_DEPENDENTS_FAILED: string;
  CREATE_DEPENDENT: string;
  EDIT_DEPENDENT: string;
  REMOVE_DEPENDENT: string;
  PERSIST_ITEM_DEPENDENT: string;
  SET_ERROR_DEPENDENTS: string;
}

export interface ActionsReducerDependents {
  listDependentsRequest(): AnyAction;
  listDependentsSuccess(data: object): AnyAction;
  listDependentsFailed(error: Error | unknown): AnyAction;
  createDependent(data: Dependente): AnyAction;
  editDependent(data: Dependente): AnyAction;
  removeDependent(data: Dependente): AnyAction;
  persistItemDependent(data: Dependente): AnyAction;
  setErrorDependents(): AnyAction;
}
