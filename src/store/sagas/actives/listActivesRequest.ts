import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, takeLatest, select } from '@redux-saga/core/effects';
import { MaskService } from 'react-native-masked-text';
import { IActives } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/Actives';

function* listActivesRequest() {
  try {
    let newData = [];

    const {
      authReducer: { user },
    } = yield select(getState);

    const value: string = yield AsyncStorage.getItem(`actives@${user.id}`);

    if (value !== null) {
      newData = JSON.parse(value);
    }

    const result = newData.map((item: IActives) => ({
      ...item,
      sellerCPF: MaskService.toMask('cpf', item.sellerCPF),
      price: MaskService.toMask('money', item.price, {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$',
      }),
    }));

    yield put(Creators.listActivesSuccess(result));
  } catch (error) {
    yield put(Creators.listActivesFailed(error));
    yield put(Creators.setErrorActives());
  }
}

export default function* watch() {
  yield takeLatest(Types.LIST_ACTIVES_REQUEST, listActivesRequest);
}
