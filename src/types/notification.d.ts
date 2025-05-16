export type NotificationState = {
  type: NotificationGroup,
  loading: boolean,
  success: boolean,
  error: string | null,
}

export type NotificationGroup = 
| "fetchDocument"
| "saveDocument"
| "authLogin"
| "authSignup"
| "authLogout"
| "wsConnect" 


export type NotificationMessageType = 
| "fetchDocumentSuccess"
| "fetchDocumentRequest"
| "loginRequest"
| "loginSuccess"
| "signupRequest"
| "signupSuccess"
| "logoutRequest"
| "logoutSuccess"


export type NotificationKey = 
| "submitReportRequest"
| "submitReportSuccess"
| "fetchFeedRequest" 
| "fetchFeedSuccess" 
| "submitVideoRequest"
| "submitVideoSuccess"
| "loginRequest"       
| "loginSuccess"
| "loginFailure"       
| "logoutRequest"       
| "logoutSuccess"      
| "logoutFailure"
| "signupRequest"      
| "signupSuccess"
| "signupFailure"
| "wsConnectRequest"
| "wsConnectSuccess"

