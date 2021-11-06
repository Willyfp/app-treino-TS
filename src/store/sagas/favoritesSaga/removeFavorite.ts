import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, select, takeLatest } from '@redux-saga/core/effects';
import { Action } from 'redux';
import { Favorite } from '../../../types/datas';
import { getState } from '../../../utils';
import { Creators, Types } from '../../reducers/favoritesReducer';

interface RemoveFavoriteProps extends Action {
  data: Favorite;
}

function* removeFavorite({ data: { id } }: RemoveFavoriteProps) {
  try {
    const {
      authReducer: { user },
      favoritesReducer: { data },
    } = yield select(getState);

    let newData = data.filter((item: Favorite) => item.id !== id);

    yield AsyncStorage.setItem(`favorites@${user.id}`, JSON.stringify(newData));

    yield put(Creators.listFavoritesSuccess(newData));
  } catch (error) {
    yield put(Creators.listFavoritesFailed(error));
  }
}

export default function* watch() {
  yield takeLatest(Types.REMOVE_FAVORITE, removeFavorite);
}
