import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";

import { updateNotificationState } from "../document/slice";
import type { YjsContentMap } from "../../api/yjsSync";
import type { JSONContent } from "@tiptap/react";
import type { NotificationState } from "../../types/notification";
import { notificationMessages } from "../../hooks/useNotificationMessages";



interface WsState {
  notification: {
    wsConnect: NotificationState;
  };
  lastMessage?: string;
  notificationMessage: string | null;
}

const initialState: WsState = {
  notification: {
    wsConnect: {
      type: "wsConnect",
      loading: false,
      success: false,
      error: null,
    },
  },
  lastMessage: undefined,
  notificationMessage: null,
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    wsConnectRequest(state, _: PayloadAction<{ roomId: string, initialContent?: YjsContentMap }>) {
      updateNotificationState(state.notification, "request", "wsConnect");
      state.notificationMessage= notificationMessages["wsConnectRequest"];
    },
    wsConnectSuccess(state) {
      updateNotificationState(state.notification, "success", "wsConnect");
      state.notificationMessage= notificationMessages["wsConnectSuccess"];
    },
    wsConnectFailure(state, action: PayloadAction<string>) {
      updateNotificationState(state.notification, "error", "wsConnect", action.payload);
    },
    wsDisconnect(state) {
      updateNotificationState(state.notification, "cleanup", "wsConnect");
    },
    wsReceiveMessage(state, action: PayloadAction<string>) {
      state.lastMessage = action.payload;
    },
    wsSendTitle(_, __: PayloadAction<string>) {
      // 実際の送信処理はSagaなどで処理。ここでは状態更新しない。
    },
    wsSendJsonContent(_, __: PayloadAction<JSONContent>) {
      // 実際の送信処理はSagaなどで処理。ここでは状態更新しない。
    },
  },
});

export const {
  wsConnectRequest,
  wsConnectSuccess,
  wsConnectFailure,
  wsDisconnect,
  wsReceiveMessage,
  wsSendTitle,
  wsSendJsonContent,
} = wsSlice.actions;

export const wsReducer = wsSlice.reducer;
