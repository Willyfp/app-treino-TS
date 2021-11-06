import { Creators, Types } from '../../reducers/auth';
import { takeLatest, select, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getState } from '../../../utils';
import { Dependents, IActives } from '../../../types/datas';
import isNumber from 'lodash/isNumber';
import { MaskService } from 'react-native-masked-text';

type AllData = [Dependents?: Array<Dependents>, Actives?: Array<IActives>];

function* listAllRequest() {
  try {
    const {
      authReducer: { user },
    } = yield select(getState);

    let newData: AllData = [];

    const data: Array<Array<JSON>> = yield AsyncStorage.multiGet([
      `dependents@${user.id}`,
      `actives@${user.id}`,
    ]);

    data.forEach(function (element) {
      newData.push(JSON.parse(element[1].toString()));
    });

    const reducer = (
      previousValue: number,
      currentValue: IActives,
      type: string,
    ) => {
      if (isNumber(currentValue[type as keyof IActives])) {
        return previousValue + currentValue[type as keyof IActives];
      }
    };

    const valueActives = newData[1]
      ?.reduce((prev, curr) => Number(reducer(prev, curr, 'price')), 0)
      .toFixed(2);

    const dataCards = [
      {
        id: 1,
        type: 'Dependents',
        name: 'Dependentes',
        quantity: newData[0]?.length,
        icon: 'users',
      },
      {
        id: 2,
        type: 'Actives',
        name: 'Ativos',
        value:
          valueActives &&
          MaskService.toMask('money', valueActives, {
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
          }),
        quantity: newData[1]?.length,
        icon: 'car',
      },
    ];

    yield put(Creators.listAllSuccess(dataCards));
  } catch (error) {
    yield put(Creators.listAllFailed(error));
  }
}

export default function* watch() {
  yield takeLatest(Types.LIST_ALL_REQUEST, listAllRequest);
}
