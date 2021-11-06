import { all, fork } from '@redux-saga/core/effects';

import createActive from './createActive';
import editActive from './editActive';
import removeActive from './removeActive';
import listActivesRequest from './listActivesRequest';

function* activesSagas() {
  yield all([
    fork(createActive),
    fork(editActive),
    fork(removeActive),
    fork(listActivesRequest),
  ]);
}

export default activesSagas;
