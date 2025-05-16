import type { NotificationKey } from "../types/notification";

export const notificationMessages:Record<NotificationKey, string> ={
  "submitReportRequest": "日報アップロード中...",
  "submitReportSuccess": "日報アップロード完了!",
  "fetchFeedRequest" : "記事取得中...",
  "fetchFeedSuccess" : "記事取得完了!!",
  "submitVideoRequest" : "動画アップロード中...",
  "submitVideoSuccess" : "動画アップロード完了!",
  "loginRequest"       : "ログイン中...",
  "loginSuccess"       : "ログイン!",
  "loginFailure"       : "ログイン失敗!",
  "logoutRequest"      : "ロウアウト中...",
  "logoutSuccess"      : "ログアウト成功!",
  "logoutFailure"      : "ログアウト失敗!",
  "signupRequest"      : "登録中...",
  "signupSuccess"      : "登録成功!",
  "signupFailure"      : "登録失敗!",
  "wsConnectRequest" : "yjs接続中...",
  "wsConnectSuccess" : "yjs接続成功!"
} 