import {all, fork} from '@redux-saga/core/effects';

import addFavorite from './addFavorite';
import listFavoritesRequest from './listFavoritesRequest';
import removeFavorite from './removeFavorite';

function* favoritesSaga() {
  yield all([
    fork(addFavorite),
    fork(removeFavorite),
    fork(listFavoritesRequest),
  ]);
}

export default favoritesSaga;
