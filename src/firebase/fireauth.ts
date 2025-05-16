import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { auth } from "./fireconfig";

export const handleAuthSignUp = async(email: string, password:string, displayName: string)=> {
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(userCredential.user, {
      displayName: displayName,
    })
    console.log("登録成功", user);
    return userCredential;
  }catch(error){
    console.error("登録失敗", error);
  }
}

export const handleAuthLogin = async(email: string, password: string)=> {
  try{
    const userCredential = await signInWithEmailAndPassword( auth, email, password);
    const user = userCredential.user;
    console.log("ログイン成功", user);
    return userCredential;

  }catch (error){
    console.error("ログイン失敗", error)
    //todo エラー処理

  }
}

export const handleAuthLogout = async()=> {
  try{
    await signOut(auth);
    console.log("ログアウト成功");
    //ログアウト処理

  }catch (error){
    console.error('ログアウトエラー', error);
  }
}