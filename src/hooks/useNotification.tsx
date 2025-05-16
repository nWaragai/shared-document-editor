import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store";


export type LoadingState = "loading" | "success" | "error";

export const useNotification = () => {
  const [loadState, setLoadState] = useState<LoadingState | null>(null);
  const [message, setMessage] = useState<string>("")
  const { 
    notification: wsNotification,
    notificationMessage: wsMessage,
  } = useSelector((state: RootState) => state.yjsWebsocket)

  const { loading, success, error } = wsNotification.wsConnect

  useEffect(()=>{
    if(wsMessage){
      setMessage(wsMessage);
    }
  },[wsMessage]);

  
  //優先順位ロード＞エラー＞成功　種別だと（認証>日報）
  useEffect(()=>{
  const loadState = (loading)? "loading"
  : (error)? "error"
  : (success)? "success" 
  : null
  
  setLoadState(loadState)
  },[loading, success, error])




  return{ message, loadState }
}