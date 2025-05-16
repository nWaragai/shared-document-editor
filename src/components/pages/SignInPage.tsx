import { useEffect, useState, type FC } from "react";
import { LoginForm } from "../organisms/auth/LoginForm";
import { Notification } from "../molecules/Notification";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";


export const SignupPage: FC = () => {
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
      this is SignupPage
      <LoginForm formMode="signup"/>
      {loadState &&
      <Notification state={loadState} message={notificationMessage || ""} />
      }
    </>
  )
}