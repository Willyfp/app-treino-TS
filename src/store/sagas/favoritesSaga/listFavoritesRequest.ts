import { select, put, takeLatest } from '@redux-saga/core/effects';
import { Creators, Types } from '../../reducers/favoritesReducer';
import { getState } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* listFavoritesRequest() {
  try {
    let newData = [];

    const {
      authReducer: { user },
    } = yield select(getState);

    const value: string = yield AsyncStorage.getItem(`favorites@${user.id}`);

    if (value !== null) {
      newData = JSON.parse(value);
    }

    yield put(Creators.listFavoritesSuccess(newData));
  } catch (error) {
    yield put(Creators.listFavoritesFailed(error));
  }
}

export default function* watch() {
  yield takeLatest(Types.LIST_FAVORITES_REQUEST, listFavoritesRequest);
}
