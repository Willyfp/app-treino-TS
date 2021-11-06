import { put, takeLatest, select } from '@redux-saga/core/effects';
import { Creators, Types } from '../../reducers/Actives';
import { Creators as modalActions } from '../../reducers/modalReducer';
import { Action } from 'redux';
import { IActives } from '../../../types/datas';
import { MaskService } from 'react-native-masked-text';
import { getState } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActionEditActive extends Action {
  data: IActives;
}

function* editActive(props: ActionEditActive) {
  try {
    const { sellerCPF, price } = props.data;

    const rawCPF = MaskService.toRawValue('cpf', sellerCPF);

    const rawPrice = MaskService.toRawValue('money', price, {
      precision: 2,
      separator: ',',
      delimiter: '.',
      unit: 'R$',
    });

    const {
      activesReducer: { data, persistedItem },
      authReducer: { user },
    } = yield select(getState);

    const index = data.findIndex(
      (item: IActives) => item.id === persistedItem.id,
    );

    let newData = [...data];

    newData[index] = {
      ...props.data,
      id: persistedItem.id,
      sellerCPF: rawCPF,
      price: rawPrice,
    };

    yield put(
      modalActions.setModal({
        title: 'Editado',
        message: 'Ativo editado com sucesso!',
        type: 'success',
      }),
    );

    yield AsyncStorage.setItem(`actives@${user.id}`, JSON.stringify(newData));

    yield put(Creators.listActivesSuccess(newData));
    yield put(Creators.persistItemActive({}));
  } catch (error) {
    yield put(
      modalActions.setModal({
        title: 'ERRO',
        message: 'Falha ao editar ativo!',
        type: 'success',
      }),
    );
    yield put(Creators.listActivesFailed(error));
    yield put(Creators.setErrorActives());
  }
}

export default function* watch() {
  yield takeLatest(Types.EDIT_ACTIVE, editActive);
}
