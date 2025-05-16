import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../types/document";
import type { NotificationState } from "../../types/notification";
import { updateNotificationState } from "../document/slice";
import { notificationMessages } from "../../hooks/useNotificationMessages";



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
    loginRequest(state, _: PayloadAction<{email: string, password: string}>){
      updateNotificationState(state.notification, "request", "authLogin");
      state.notificationMessage = notificationMessages["loginRequest"];
    },
    loginSuccess(state, action: PayloadAction<UserType>){
      state.user = action.payload;
      state.isAuthenticated = true;
      updateNotificationState(state.notification, "success", "authLogin");
      state.notificationMessage = notificationMessages["loginSuccess"];
    },
    loginFailure(state, action: PayloadAction<string>){
      updateNotificationState(state.notification, "error", "authLogin", action.payload);
      
    },
    signupRequest(state, _: PayloadAction<{email:string, password: string, displayName: string}>){
      console.log("signup request")
      updateNotificationState(state.notification, "request", "authLogin");
      state.notificationMessage = notificationMessages["signupRequest"];
    },
    signupSuccess(state, action: PayloadAction<UserType>){
      console.log("signup success")
      state.user = action.payload;
      state.isAuthenticated = true; 
      updateNotificationState(state.notification, "success", "authLogin");
      state.notificationMessage = notificationMessages["signupSuccess"];
    },
    signupFailure(state, action: PayloadAction<string>){
      console.log("signup failed")
      updateNotificationState(state.notification, "error", "authLogin", action.payload);
      
    },
    logoutRequest(state, _: PayloadAction<UserType>){
      updateNotificationState(state.notification, "request", "authLogin");
      state.notificationMessage = notificationMessages["logoutRequest"];
    },
    logoutSuccess(state, _: PayloadAction){
      updateNotificationState(state.notification, "success", "authLogin");
      state.notificationMessage = notificationMessages["logoutSuccess"];
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure(state, action: PayloadAction<string>){
      updateNotificationState(state.notification, "error", "authLogin", action.payload);
    },
    setUserFromAuthState(state, action: PayloadAction<UserType| null>){
      state.user = action.payload;
      state.isAuthenticated = true;
    }

  }
})


export const { loginRequest,loginFailure,loginSuccess,logoutFailure,logoutRequest,logoutSuccess,signupFailure,signupRequest,signupSuccess, setUserFromAuthState } = authSlice.actions;

export const authReducer = authSlice.reducer;