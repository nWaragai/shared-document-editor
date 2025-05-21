import { memo, useEffect, useState, type FC } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { MdError, MdOutlineSave } from "react-icons/md";
import { IoReload } from "react-icons/io5";


export const SaveStateMessage: FC = memo(() => {
  const [show, setShow] = useState(false);
  const savedToFirebase = useSelector((state:RootState)=> state.document.notification.saveDocument.success);
  const requestingSave = useSelector((state:RootState)=> state.document.notification.saveDocument.loading);
  const requestingError = useSelector((state:RootState)=> state.document.notification.saveDocument.error);
  const notificationMessage = useSelector((state:RootState)=> state.document.notificationMessage);
  


  useEffect(()=>{
    if(!savedToFirebase)  return;
    setShow(true)
    const showInterval = setInterval(()=>setShow(false), 2000);
    return ()=> clearInterval(showInterval);
  },[savedToFirebase])

  useEffect(()=>{
    if(!requestingSave) return;
    setShow(true);
  },[requestingSave])

  useEffect(()=>{
    if(!requestingError) return;
    setShow(true);
    const showInterval = setInterval(()=>setShow(false), 2000);
    return ()=> clearInterval(showInterval);
  },[requestingError])

  if(!show) return null;

  return(  
    <div className="save-state-message">
      {requestingSave? <IoReload /> : savedToFirebase? <MdOutlineSave/> : <MdError />}
      {requestingError || notificationMessage}
    </div>
  )

})