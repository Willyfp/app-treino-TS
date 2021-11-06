import { put, takeLatest } from '@redux-saga/core/effects';
import { Creators, Types } from '../../reducers/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../../types/datas';
import { FormLogin } from '../../../types/forms';
import { Action } from 'redux';
import { Creators as modalActions } from '../../reducers/modalReducer';

interface ActionLogin extends Action {
  data: FormLogin;
}

function* loginRequest({ data: { email, password } }: ActionLogin) {
  try {
    let data = [];
    let logedUser: User;

    const value: string = yield AsyncStorage.getItem('users');

    if (value !== null) {
      data = JSON.parse(value);

      const found = data.find(
        (element: User) =>
          element.email === email && element.password === password,
      );

      if (!found) {
        throw 'Usuário ou senha incorretos!';
      } else {
        logedUser = found;
        yield put(Creators.loginSuccess(logedUser));
        yield AsyncStorage.setItem('token', JSON.stringify(logedUser.id));
      }
    } else {
      throw 'Usuário ou senha incorretos!';
    }
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
  yield takeLatest(Types.LOGIN_REQUEST, loginRequest);
}
