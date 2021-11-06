import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeLatest, put } from '@redux-saga/core/effects';
import { Types } from '../../reducers/auth';

function* logout() {
  try {
    yield AsyncStorage.removeItem('token');
  } catch (error) {}
}

export default function* watch() {
  yield takeLatest(Types.LOGOUT, logout);
}
