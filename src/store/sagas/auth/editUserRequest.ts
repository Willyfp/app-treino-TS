import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, select, takeLatest } from '@redux-saga/core/effects';
import { Action } from 'redux';
import { User } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/auth';
import { Creators as modalActions } from '../../reducers/modalReducer';

interface ActionEdit extends Action {
  data: User;
}

function* editUserRequest({ data }: ActionEdit) {
  let newData = [];

  try {
    const value: string = yield AsyncStorage.getItem('users');

    const {
      authReducer: { user },
    } = yield select(getState);

    newData = JSON.parse(value);

    const index = newData.findIndex((item: User) => item.id === user.id);

    newData[index] = {
      ...user,
      ...data,
    };

    AsyncStorage.setItem('users', JSON.stringify(newData));

    yield put(Creators.editUserSuccess(newData[index]));

    yield put(
      modalActions.setModal({
        visible: true,
        title: 'Editado',
        message: 'Usuário editado com sucesso!',
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(Creators.editUserFailed(error));
  }
}

export default function* watch() {
  yield takeLatest(Types.EDIT_USER_REQUEST, editUserRequest);
}
