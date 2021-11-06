import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  ActionsReducerModal,
  InitialStateModalInterface,
  setBottomSheetInterface,
  setModalInterface,
  TypesReducerModal,
} from './types';

const INITIAL_STATE: ImmutableObject<InitialStateModalInterface> = Immutable({
  modal: {
    visible: false,
    type: 'default',
    title: '',
    message: '',
    confirm: false,
  },
  bottomSheet: {
    child: undefined,
    visible: false,
  },
});

const setModal: setModalInterface = (state = INITIAL_STATE, { data }) =>
  state.set('modal', data);

const setBottomSheet: setBottomSheetInterface = (
  state = INITIAL_STATE,
  { data },
) => state.set('bottomSheet', data);

export const { Types, Creators } = createActions<
  TypesReducerModal,
  ActionsReducerModal
>({
  setModal: ['data'],
  setBottomSheet: ['data'],
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_MODAL]: setModal,
  [Types.SET_BOTTOM_SHEET]: setBottomSheet,
});
