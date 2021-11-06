import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, takeLatest, select } from '@redux-saga/core/effects';
import { MaskService } from 'react-native-masked-text';
import { Action } from 'redux';
import { IActives } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/Actives';
import { Creators as modalActions } from '../../reducers/modalReducer';
import isNumber from 'lodash/isNumber';

interface CreateActiveActionProps extends Action {
  data: IActives;
}

function* createActive(props: CreateActiveActionProps) {
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
      activesReducer: { data },
      authReducer: { user },
    } = yield select(getState);

    const formatedData = data.map((element: IActives) => {
      const value = isNumber(element.price)
        ? element.price
        : MaskService.toRawValue('money', element.price, {
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
          });

      return {
        ...element,
        price: value,
      };
    });

    const newData = [
      {
        ...props.data,
        sellerCPF: rawCPF,
        price: rawPrice,
        id: Date.now(),
      },
      ...formatedData,
    ];

    yield put(
      modalActions.setModal({
        visible: true,
        title: 'Adicionado',
        message: 'Ativo adicionado com sucesso!',
        type: 'success',
      }),
    );

    yield AsyncStorage.setItem(`actives@${user.id}`, JSON.stringify(newData));

    yield put(Creators.listActivesSuccess(newData));
  } catch (error) {
    yield put(
      modalActions.setModal({
        visible: true,
        title: 'ERRO',
        message: 'Falha ao adicionar ativo!',
        type: 'success',
      }),
    );
    yield put(Creators.listActivesFailed(error));

    yield put(Creators.setErrorActives());
  }
}

export default function* watch() {
  yield takeLatest(Types.CREATE_ACTIVE, createActive);
}
