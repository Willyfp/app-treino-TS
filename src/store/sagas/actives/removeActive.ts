import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import { Action } from 'redux';
import { IActives } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/Actives';
import { Creators as modalActions } from '../../reducers/modalReducer';

interface ActionRemoveActive extends Action {
  data: IActives;
}
function* removeActive({ data: { id } }: ActionRemoveActive) {
  try {
    const {
      activesReducer: { data },
      authReducer: { user },
    } = yield select(getState);

    const newActives: IActives[] = yield data.filter(
      (item: IActives) => item.id !== id,
    );

    yield AsyncStorage.setItem(
      `actives@${user.id}`,
      JSON.stringify(newActives),
    );

    yield put(
      modalActions.setModal({
        title: 'Removido',
        message: 'Ativo removido com sucesso!',
        type: 'success',
      }),
    );

    yield put(Creators.listActivesSuccess(newActives));
  } catch (error) {
    yield put(Creators.listActivesFailed(error));
    yield put(
      modalActions.setModal({
        title: 'ERRO',
        message: 'Falha ao remover ativo!',
        type: 'success',
      }),
    );
    yield put(Creators.setErrorActives());
  }
}

export default function* watch() {
  yield takeLatest(Types.REMOVE_ACTIVE, removeActive);
}
