import { ReactNode } from 'react';
import { AnyAction } from 'redux';
import { ImmutableObject } from 'seamless-immutable';

export interface InitialStateModalInterface {
  modal: {
    visible: boolean;
    type: string;
    title: string;
    message: string;
    confirm: boolean;
  };
  bottomSheet: {
    child: ReactNode;
    visible: false;
  };
}

export interface setModalInterface {
  (
    state: ImmutableObject<InitialStateModalInterface>,
    action: { type: 'SET_MODAL'; data: InitialStateModalInterface },
  ): ImmutableObject<InitialStateModalInterface>;
}

export interface setBottomSheetInterface {
  (
    state: ImmutableObject<InitialStateModalInterface>,
    action: { type: 'SET_BOTTOM_SHEET'; data: InitialStateModalInterface },
  ): ImmutableObject<InitialStateModalInterface>;
}

export interface TypesReducerModal {
  SET_MODAL: string;
  SET_BOTTOM_SHEET: string;
}

interface ModalGlobalProps {
  visible?: boolean;
  functionModal?(): void;
  child?: ReactNode;
  type?: string;
  title?: string;
  message?: string;
  confirm?: boolean;
}

interface BottomSheetProps {
  child?(): Function;
  visible?: boolean;
}

export interface ActionsReducerModal {
  setModal(data: ModalGlobalProps): AnyAction;
  setBottomSheet(data: ModalGlobalProps): AnyAction;
}
