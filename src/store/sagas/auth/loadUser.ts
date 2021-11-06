import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeLatest, put } from '@redux-saga/core/effects';
import { User } from '../../../types/datas';
import { Creators, Types } from '../../reducers/auth';

function* loadUser() {
  try {
    const token: string = JSON.parse(yield AsyncStorage.getItem('token'));

    if (!token) {
      throw 'sem token';
    }

    let data: User[];

    let logedUser: User;

    const value: string = yield AsyncStorage.getItem('users');

    if (value !== null) {
      data = JSON.parse(value);

      const found: User = yield data.find(
        (element) => element.id.toString() === token.toString(),
      );

      if (!found) {
        throw 'Não achou';
      } else {
        logedUser = found;
      }
    } else {
      throw 'não achou';
    }

    yield put(Creators.loginSuccess(logedUser));
  } catch (error) {
    yield put(Creators.loginFailed(error));
  }
}

export default function* watch() {
  yield takeLatest(Types.LOAD_USER, loadUser);
}
