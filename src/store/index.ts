
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { watchYjsSaga } from "./ws/saga";
import { wsReducer } from "./ws/slice";
import { documentReducer } from "./document/slice";



const sagaMiddleware = createSagaMiddleware();

export function* rootSaga(){
  yield all([
    fork(watchYjsSaga),
  ])
}


export const store = configureStore({
  reducer: {
    yjsWebsocket: wsReducer,
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;