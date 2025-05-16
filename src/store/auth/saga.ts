import { call, put, takeLatest } from 'redux-saga/effects';

import {
  loginSuccess,
  loginFailure,
  loginRequest,
  logoutSuccess,
  logoutFailure,
  logoutRequest,
  signupFailure,
  signupSuccess,
  signupRequest
} from './slice'

import { handleAuthLogin, handleAuthLogout, handleAuthSignUp } from '../../firebase/fireauth';
import type { UserCredential } from 'firebase/auth';

function* handleLogin(action: {type: string; payload: {email: string; password: string;} }): Generator {
  try {
    const { email, password } = action.payload;
    const userCredential = yield call(handleAuthLogin, email, password);
    yield put(loginSuccess({
       uid: userCredential.user.uid, 
       displayName: userCredential.user.displayName,
       email: userCredential.user.email, 
      }));
  } catch (error) {
    if(error instanceof Error){
      yield put(loginFailure(error.message));
    }else{
      yield put(loginFailure(`unknown error, ${error}`));
    }
  }
}

function* handleLogout() {
  try{
    yield call(handleAuthLogout);
    yield put(logoutSuccess());
  } catch(error) {
    if(error instanceof Error){
      yield put(logoutFailure(error.message));
    }else{
      yield put(logoutFailure(`unknown error, ${error}`));
    }
  }
}

function* handleSignUp(action: {type: string; payload: {email: string; password: string; userName: string} }): Generator {
  try{
    const { email, password, userName } = action.payload;
    //サインアップ
    const userCredential = yield call(handleAuthSignUp, email, password, userName);
    //サインアップが成功したらそのままログイン
    if(!userCredential) throw new Error("user undefined")
    const userLoginCredential: UserCredential = yield call(handleAuthLogin, email, password);
    yield put(signupSuccess({
      uid: userLoginCredential.user.uid, 
      displayName: userLoginCredential.user.displayName!,
      email: userLoginCredential.user.email!, 
     }));

  }catch (error){
    console.error(error)
    if(error instanceof Error){
      yield put(signupFailure(error.message));
    }else{
      yield put(signupFailure(`unknown error, ${error}`));
    }
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(signupRequest.type, handleSignUp);
}
