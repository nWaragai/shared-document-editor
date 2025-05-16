import { useEffect, useState, type FC } from "react";
import { LoginForm } from "../organisms/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { Notification } from "../molecules/Notification";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";


export const LoginPage: FC = () => {
  const {user, isAuthenticated, notification:{"authLogin": {loading: loading,success: success, error: errorMessage }}, notificationMessage} = useSelector((state: RootState)=> state.auth);
  const [loadState, setLoadState] = useState<"loading" | "success" | "error" | null>(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const loadState = loading? "loading": success? "success" : errorMessage? "error": null
      setLoadState(loadState)
    },[loading, success, errorMessage])

  useEffect(()=>{
    if(user && isAuthenticated){
      navigate('/editor');
    }
  },[user, navigate])

  return(
    <>
      this is LoginPage
      <LoginForm formMode="login"/>
      {loadState &&
      <Notification state={loadState} message={notificationMessage || ""} />
      }
    </>
  )
}