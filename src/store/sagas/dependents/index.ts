import { all, fork } from '@redux-saga/core/effects';
import createDependent from './createDependent';
import listDependentsRequest from './listDependentsRequest';
import removeDependent from './removeDependent';
import editDependent from './editDependent';

function* dependentsSagas() {
  yield all([
    fork(createDependent),
    fork(listDependentsRequest),
    fork(removeDependent),
    fork(editDependent),
  ]);
}

export default dependentsSagas;
