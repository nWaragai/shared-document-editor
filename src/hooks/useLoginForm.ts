
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginRequest, signupRequest } from "../store/auth/slice";
import type { LoginRequirements } from "../types/document";

export const useLoginForm = (formMode: string) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, control, formState: {errors} } = useForm<LoginRequirements>({
    mode:"onChange", defaultValues: { }
  });

  const onSubmit = async(data: LoginRequirements) => {
    const email = data.email;
    const password = data.password;
    const displayName = data.displayName;

    //reduxで処理
    if(formMode==="login"){
      dispatch(loginRequest({email, password}))
    }else if(formMode==="signup"){
      if(!displayName) return console.log("enter displayName")
      dispatch(signupRequest({email, password, displayName}))
    }
    
  }

  return{ 
    register,
    handleSubmit,
    reset,
    control,
    onSubmit,
    errors,
  }
}