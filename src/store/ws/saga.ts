import { call, put, takeLatest } from 'redux-saga/effects';
import { initYjsConnection, initYjsContent, updateJsonContent, updateTitle } from '../../api/yjsSync';

import { wsConnectFailure, wsConnectRequest, wsConnectSuccess, wsSendJsonContent, wsSendTitle } from './slice';

import type { Doc } from 'yjs';

export function* startYjsSaga(action: ReturnType<typeof wsConnectRequest> ): Generator {
  

  try {
    const ydoc: Doc = yield call(initYjsConnection, action.payload.roomId);
    if (action.payload.initialContent) {
      yield call(initYjsContent, action.payload.initialContent);
    }
    yield put(wsConnectSuccess());

    // WebSocket接続成功時の通知などあればここで dispatch
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

