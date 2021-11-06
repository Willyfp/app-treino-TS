import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeLatest, put } from '@redux-saga/core/effects';
import { Alert } from 'react-native';
import { Action } from 'redux';
import { User } from '../../../types/datas';
import { Creators, Types } from '../../reducers/auth';
import { Creators as modalActions } from '../../reducers/modalReducer';

interface ActionRegister extends Action {
  data: User;
}

function* registerRequest({ data }: ActionRegister) {
  try {
    let newData: User[];

    const value: string = yield AsyncStorage.getItem('users');

    if (value !== null) {
      newData = JSON.parse(value);

      const found = newData.find((element) => element.email === data.email);

      if (found) {
        throw 'Email já cadastrado!';
      } else {
        newData = [...newData, { ...data, id: Date.now() }];
      }
    } else {
      newData = [{ ...data, id: Date.now() }];
    }

    yield AsyncStorage.setItem('users', JSON.stringify(newData));

    yield put(Creators.loginSuccess(data));
    yield AsyncStorage.setItem(
      'token',
      JSON.stringify(newData[newData.length - 1].id),
    );
  } catch (error) {
    yield put(Creators.loginFailed(error));
    yield put(
      modalActions.setModal({
        type: 'success',
        visible: true,
        title: 'ERRO',
        message: `${error}`,
      }),
    );
  }
}

export default function* watch() {
  yield takeLatest(Types.REGISTER_REQUEST, registerRequest);
}
