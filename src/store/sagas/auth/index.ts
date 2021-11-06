import { all, fork } from '@redux-saga/core/effects';
import loginRequest from './loginRequest';
import registerRequest from './registerRequest';
import loadUser from './loadUser';
import logout from './logout';
import editUserRequest from './editUserRequest';
import listAllRequest from './listAllRequest';

function* authSagas() {
  yield all([
    fork(loginRequest),
    fork(registerRequest),
    fork(loadUser),
    fork(logout),
    fork(editUserRequest),
    fork(listAllRequest),
  ]);
}

export default authSagas;
