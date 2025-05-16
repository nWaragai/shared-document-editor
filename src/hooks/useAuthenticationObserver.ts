import { useEffect } from "react";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/fireconfig";
import { setUserFromAuthState } from "../store/auth/slice";


export const useAuthenticationObserver = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated)
  //ログイン状態を監視
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=> {
      if(user){
        dispatch(setUserFromAuthState({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName!,
        }))
      } else{
        dispatch(setUserFromAuthState(null))
      }
    });

    return ()=> unsubscribe();
  },[dispatch])


  return{ isAuthenticated }
}