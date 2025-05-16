import type { FC } from "react";
import { useLoginForm } from "../../../hooks/useLoginForm";




type Props = {
  formMode: string;
}

export const LoginForm: FC<Props> = (props) => {
  const { formMode } = props;
  const { 
    onSubmit,
    handleSubmit,
    register,
    errors,
  } = useLoginForm(formMode);

  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-header">
          <h2 style={{paddingLeft:"30px"}}>{formMode==="login"? 'ログイン': 'サインアップ'}</h2>
        </div>
        
        
        <div className="form-body">
          {formMode==="signup" &&   
          <>
            <label>ユーザー名</label>
            <input 
              type="displayName"
              {...register("displayName", {
              required: '必須項目',
              maxLength: {
                value: 15,
                message: '最大15文字まで'
              }
            })} placeholder="ユーザー名を入力..."/>
            {errors.displayName && (
              <p className="form-error-message">{errors.displayName.message}</p>
            )}
            <br />
          </>
          }

          <label>メールアドレス</label>
          <input
            type="email" 
            {...register("email",{
              required: '必須項目',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "有効なメールアドレスを入力してください",
              },
            })} placeholder="Emailを入力..."/>
            {errors.email && (
              <p className="form-error-message">{errors.email.message}</p>
            )}
          <br />

          <label>パスワード</label>
          <input 
            type="password"
            {...register("password",{
              required: '必須項目',
              minLength: {
                value: 6,
                message: '最低6文字以上'
              }
            })} placeholder="パスワードを入力..."/>
            {errors.password && (
              <p className="form-error-message">{errors.password.message}</p>
            )}
          <br />

        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">提出</button>  
        </div>
      </form>
    </>
  )
}