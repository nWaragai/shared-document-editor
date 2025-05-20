
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { watchYjsSaga } from "./ws/saga";
import { wsReducer } from "./ws/slice";
import { documentReducer } from "./document/slice";
import { authReducer } from "./auth/slice";
import authSaga from "./auth/saga";
import { watchDirty, watchFetchDocument } from "./document/saga";



const sagaMiddleware = createSagaMiddleware();

export function* rootSaga(){
  yield all([
    fork(watchYjsSaga),
    fork(authSaga),
    fork(watchDirty),
    fork(watchFetchDocument),
  ])
}


export const store = configureStore({
  reducer: {
    yjsWebsocket: wsReducer,
    document: documentReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;