import React, { memo, useEffect, useState, type FC } from "react";
import { type LoadingState } from "../../hooks/useNotification";
import { ScaleLoader } from "react-spinners";


type Props = {
  state: LoadingState,
  message: string,
}

//通知専用コンポーネント　propsとして通信状態stateと表示メッセージmessageを渡す

export const Notification: FC<Props> = memo((props)=> {
  const { state, message } = props
  const [visible, setVisible] = useState(true);

  useEffect(()=> {
    setVisible(true)
    const timer = setTimeout(()=> setVisible(false), 3000)
    return ()=> clearTimeout(timer)
  },[state])

  const color = state=== "loading"? "blue" : state === "success"? "green" : "red"
  const loadStateMessage = state=== "loading"? `${message}`: state==="success"? `✅${message}`: "❌Error!!" 
  const style: React.CSSProperties={
    backgroundColor: color
  }

  if(!visible) return null;

  return(
    <div className={`notification-container`} style={style}>
      {state==="loading" && <ScaleLoader color="whitesmoke"/>}
      {loadStateMessage}
    </div>
  )
})