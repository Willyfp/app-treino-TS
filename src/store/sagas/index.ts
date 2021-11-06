import { all, fork } from 'redux-saga/effects';
import authSagas from './auth';
import dependentsSagas from './dependents';
import favoritesSaga from './favoritesSaga';
import activesSagas from './actives';

function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(dependentsSagas),
    fork(favoritesSaga),
    fork(activesSagas),
  ]);
}

export default rootSaga;
