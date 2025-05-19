import { call, debounce, put, select, takeLatest } from "redux-saga/effects";
import { fetchDocListFailure, fetchDocListRequest, fetchDocListSuccess, fetchDocumentFailure, fetchDocumentRequest, fetchDocumentSuccess, markDirty, saveDocumentFaliure, saveDocumentRequest, saveDocumentSuccess } from "./slice";
import { exportYjsSnapshot } from "../../api/yjsSync";
import type { RootState } from "..";
import type { DocMeta, DocType } from "../../types/document";
import { fetchDocListFromFireStore } from "../../firebase/fetchDocList";
import { fetchDocumentContentFromFireStore } from "../../firebase/fetchDocumentContent";


function* saveDocumentSaga(): Generator {
  // 二重保存/不要保存を防止
  //更新内容がない(!isDirty)か保存中(notification.saveDocument.loading)の時早期リターン
  if (
    yield select((state: RootState)=>state.document.notification.saveDocument.loading) 
    || 
    !(yield select((state: RootState)=> state.document.isDirty))
  ) return; 

  try {
    yield put(saveDocumentRequest()); 
    // const ydoc: Y.Doc = yield call(getYdoc);      // 参照のみ
    const snapshot = yield call (exportYjsSnapshot, new Date().toISOString());
    
    //fireStoreに保存をする関数
    yield call (saveDocToFireStore, snapshot);
    yield put(saveDocumentSuccess());

  } catch (error :any){
    yield put (saveDocumentFaliure(error.message));
  }
}


//既存のドキュメントリストをクリックしたときに取得を開始
function* fetchDocumentSaga (action: ReturnType<typeof fetchDocumentRequest>): Generator {
  //todo 
  try{
    const meta: DocMeta = action.payload;
    //firestoreから取得する
    const document: DocType = yield call(fetchDocumentContentFromFireStore, meta);
    yield put(fetchDocumentSuccess(document));
  }catch (error: any){
    yield put(fetchDocumentFailure(error.message))
  }
}

//ログイン後meta情報から利用可能なドキュメントリストを取得
function* fetchAvailableDocSaga (): Generator {
  try{
    const documentList: DocMeta[] = yield call(fetchDocListFromFireStore);
    yield put(fetchDocListSuccess(documentList));

  }catch(error: any){
    yield put(fetchDocListFailure(error.message));
  }
}


export function* watchDirty(): Generator {
  yield debounce(1500, markDirty, saveDocumentSaga);
}

export function* watchFetchDocument(): Generator {
  yield takeLatest(fetchDocumentRequest, fetchDocumentSaga);
  yield takeLatest(fetchDocListRequest, fetchAvailableDocSaga)
}
