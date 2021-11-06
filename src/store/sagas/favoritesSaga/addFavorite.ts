import { put, select, takeLatest } from 'redux-saga/effects';
import { Creators, Types } from '../../reducers/favoritesReducer';
import { getState } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action } from 'redux';
import { Favorite } from '../../../types/datas';

interface ActionAddFavoriteProps extends Action {
  data: Favorite;
}

function* addFavorite(props: ActionAddFavoriteProps) {
  try {
    let newData = [];

    const {
      authReducer: { user },
      favoritesReducer: { data },
    } = yield select(getState);

    newData = [...data, { ...props.data, id: Date.now() }];

    yield AsyncStorage.setItem(`favorites@${user.id}`, JSON.stringify(newData));

    yield put(Creators.listFavoritesSuccess(newData));
  } catch (error) {
    yield put(Creators.listFavoritesFailed(error));
  }
}

export default function* watch() {
  yield takeLatest(Types.ADD_FAVORITE, addFavorite);
}
