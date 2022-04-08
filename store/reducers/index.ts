import { combineReducers } from '@reduxjs/toolkit';
import { all, fork } from 'redux-saga/effects';

import usersReducer from './usersReducer/usersReducer';
import { usersSaga } from './usersReducer/usersSaga';


export const rootReducer = combineReducers({
  users: usersReducer
});


export function* rootSaga() {
  yield all([
    fork(usersSaga),
  ]);
}
