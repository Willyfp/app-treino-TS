import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, takeLatest, select } from '@redux-saga/core/effects';
import { MaskService } from 'react-native-masked-text';
import { Dependents } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/Dependents';

function* listDependentsRequest() {
  try {
    let newData = [];

    const {
      authReducer: { user },
    } = yield select(getState);

    const value: string = yield AsyncStorage.getItem(`dependents@${user.id}`);

    if (value !== null) {
      newData = JSON.parse(value);
    }

    const result = newData.map((item: Dependents) => ({
      ...item,
      cpf: MaskService.toMask('cpf', item.cpf),
    }));

    yield put(Creators.listDependentsSuccess(result));
  } catch (error) {
    yield put(Creators.listDependentsFailed(error));
    yield put(Creators.setErrorDependents());
  }
}

export default function* watch() {
  yield takeLatest(Types.LIST_DEPENDENTS_REQUEST, listDependentsRequest);
}
