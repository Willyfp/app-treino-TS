import { Action, AnyAction } from 'redux';
import { ImmutableObject } from 'seamless-immutable';

export interface InitalStateActivesInterface {
  loading: boolean;
  success: boolean;
  data: Array<Active>;
  persistedItem: Active;
  error?: Error;
}

export interface Active {
  id?: string;
  assetName?: string;
  document?: string;
  buyDate?: string;
  price?: string;
  sellerName?: string;
  sellerCPF?: string;
}

export type AAA = Action & {
  data: Active[];
};

export interface ListActivesSuccess {
  (
    state: ImmutableObject<InitalStateActivesInterface>,
    action: { type: 'LIST_ACTIVES_SUCCESS'; data: Active },
  ): ImmutableObject<InitalStateActivesInterface>;
}

export interface ListActivesFailed {
  (
    state: ImmutableObject<InitalStateActivesInterface>,
    action: { type: 'LIST_ACTIVES_FAILED'; error: Error },
  ): ImmutableObject<InitalStateActivesInterface>;
}

export interface PersistItemActive {
  (
    state: ImmutableObject<InitalStateActivesInterface>,
    action: { type: 'PERSIST_ITEM_ACTIVE'; data: Active },
  ): ImmutableObject<InitalStateActivesInterface>;
}

export interface TypesReducerActives {
  LIST_ACTIVES_REQUEST: string;
  LIST_ACTIVES_SUCCESS: string;
  LIST_ACTIVES_FAILED: string;
  CREATE_ACTIVE: string;
  EDIT_ACTIVE: string;
  REMOVE_ACTIVE: string;
  PERSIST_ITEM_ACTIVE: string;
  SET_ERROR_ACTIVES: string;
}

export interface ActionsReducerActives {
  listActivesRequest(): AnyAction;
  listActivesSuccess(data: object): AnyAction;
  listActivesFailed(error: Error | unknown): AnyAction;
  createActive(data: Active): AnyAction;
  editActive(data: Active): AnyAction;
  removeActive(data: Active): AnyAction;
  persistItemActive(data: Active): AnyAction;
  setErrorActives(): AnyAction;
}
