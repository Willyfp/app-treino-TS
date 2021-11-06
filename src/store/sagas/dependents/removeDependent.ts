import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import { Action } from 'redux';
import { Dependents } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/Dependents';
import { Creators as modalActions } from '../../reducers/modalReducer';

interface ActionRemoveDependent extends Action {
  data: Dependents;
}
function* removeDependent({ data: { id } }: ActionRemoveDependent) {
  try {
    const {
      dependentsReducer: { data },
      authReducer: { user },
    } = yield select(getState);

    const newDependents: Dependents[] = yield data.filter(
      (item: Dependents) => item.id !== id,
    );

    yield AsyncStorage.setItem(
      `dependents@${user.id}`,
      JSON.stringify(newDependents),
    );

    yield put(
      modalActions.setModal({
        title: 'Removido',
        message: 'Dependente removido com sucesso!',
        type: 'success',
      }),
    );

    yield put(Creators.listDependentsSuccess(newDependents));
  } catch (error) {
    yield put(Creators.listDependentsFailed(error));
    yield put(
      modalActions.setModal({
        title: 'ERRO',
        message: 'Falha ao remover dependente!',
        type: 'success',
      }),
    );
    yield put(Creators.setErrorDependents());
  }
}

export default function* watch() {
  yield takeLatest(Types.REMOVE_DEPENDENT, removeDependent);
}
