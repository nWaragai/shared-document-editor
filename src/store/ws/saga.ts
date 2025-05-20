import { call, put, select, takeLatest } from 'redux-saga/effects';
import { disconnectYjs, initYjsConnection, initYjsContent, restoreYjsFromRedux, updateJsonContent, updateTitle } from '../../api/yjsSync';

import { wsConnectFailure, wsConnectRequest, wsConnectSuccess, wsSendJsonContent, wsSendTitle } from './slice';
import type { RootState } from '..';
import type { DocType } from '../../types/document';

export function* startYjsSaga(action: ReturnType<typeof wsConnectRequest> ): Generator {
  

  try {
    if(!action.payload.userName) throw new Error("invalid user: please login");
    yield call (disconnectYjs);

    yield call(initYjsConnection, action.payload.roomId, action.payload.userName);

    yield put(wsConnectSuccess());
    
    const doc: DocType | null = yield select((state: RootState)=> state.document.document);
    if(doc) {
      yield call(restoreYjsFromRedux, doc);
    }
  } catch (e: any) {
    yield put (wsConnectFailure(e.message))
    console.error('Yjs connection failed', e);
  }
}

export function* updateTitleSaga(action: ReturnType<typeof wsSendTitle>) {
  try {
    yield call(updateTitle, action.payload);
  } catch (e) {
    console.error('Failed to update title in Yjs', e, action.payload);
  }
}

export function* updateJsonContentSaga(action: ReturnType<typeof wsSendJsonContent>){
  try {
    yield call(updateJsonContent, action.payload);
    console.log("updated content!")
  } catch (e) {
    console.error('Failed to update content in Yjs', e, action.payload);
  }
}



export function* watchYjsSaga(){
  yield takeLatest(wsConnectRequest, startYjsSaga);
  yield takeLatest(wsSendJsonContent, updateJsonContentSaga);
  yield takeLatest(wsSendTitle, updateTitleSaga);
}

