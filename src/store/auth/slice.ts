import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../types/document";
import type { NotificationState } from "../../types/notification";
import { updateNotificationState } from "../document/slice";
import { notificationMessages } from "../../hooks/useNotificationMessages";
import { actionChannel } from "redux-saga/effects";


interface AuthState {
  user: UserType | null,
  isAuthenticated: boolean,
  notification: {
    "authLogin": NotificationState
  },
  notificationMessage: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  notification: {
    "authLogin":{
      type: "authLogin",
      loading: false,
      success: false,
      error: null,
    },
  },
  notificationMessage: null,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    loginRequest(state, _: PayloadAction<UserType>){
      updateNotificationState(state.notification, "request", "authLogin");
      state.notificationMessage = notificationMessages["loginRequest"];
    },
    loginSuccess(state, _: PayloadAction<UserType>){
      updateNotificationState(state.notification, "success", "authLogin");
      state.notificationMessage = notificationMessages["loginSuccess"];
    },
    loginFailure(state, action: PayloadAction<string>){
      updateNotificationState(state.notification, "error", "authLogin", action.payload);
      
    },
    signupRequest(state, _: PayloadAction<UserType>){
      updateNotificationState(state.notification, "request", "authLogin");
      state.notificationMessage = notificationMessages["signupRequest"];
    },
    signupSuccess(state, _: PayloadAction<UserType>){
      updateNotificationState(state.notification, "success", "authLogin");
      state.notificationMessage = notificationMessages["signupSuccess"];
    },
    signupFailure(state, action: PayloadAction<string>){
      updateNotificationState(state.notification, "error", "authLogin", action.payload);
      
    },
    logoutRequest(state, _: PayloadAction<UserType>){
      updateNotificationState(state.notification, "request", "authLogin");
      state.notificationMessage = notificationMessages["logoutRequest"];
    },
    logoutSuccess(state, _: PayloadAction){
      updateNotificationState(state.notification, "success", "authLogin");
      state.notificationMessage = notificationMessages["logoutSuccess"];
    },
    logoutFailure(state, action: PayloadAction<string>){
      updateNotificationState(state.notification, "error", "authLogin", action.payload);
      
    },

  }
})


export const { loginRequest,loginFailure,loginSuccess,logoutFailure,logoutRequest,logoutSuccess,signupFailure,signupRequest,signupSuccess } = authSlice.actions;

