import { useEffect, useState, type FC } from "react";
import { EditorRenderer } from "../organisms/editor/EditorRenderer";
import { Notification } from "../molecules/Notification";
import { useNotification } from "../../hooks/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { wsConnectRequest } from "../../store/ws/slice";
import { initializeDocument } from "../../store/document/slice";
import type { RootState } from "../../store";
import { useUploadToYjs } from "../../hooks/useUploadToYjs";

import { getYjsContentMap } from "../../api/yjsSync";
import { IoDocumentTextSharp } from "react-icons/io5";




export const EditorPage: FC = () => {
  const { loadState, message } = useNotification();
  const [title, setTitle] = useState<string>("")
  const user = useSelector((state: RootState)=> state.auth.user);
  const success = useSelector((state: RootState)=> state.yjsWebsocket.notification.wsConnect.success);
  const dispatch = useDispatch();

  const handleStartWebsocket = () => {
    dispatch(wsConnectRequest({roomId: "test-room-Id-ws"}));
  }
  const document = useSelector((state: RootState)=> state.document.document)
  const { onChangeJsonContent, onChangeTitle } = useUploadToYjs();
  useEffect(()=>{
    if(document)return console.log("document exists");
    console.log("creating document")
    dispatch(initializeDocument());
  },[document])
  



  useEffect(()=> {
    if(!success) return;
    const ymap = getYjsContentMap();
    const handleChange = () => {
      const newTitle = ymap.get('title') || '';
      setTitle(newTitle);
    };
    handleChange();
    ymap.observe(handleChange);
    return() => ymap.unobserve(handleChange);
  },[success])

  const onChangeTitleValue = (value: string) => {
    setTitle(value);
    onChangeTitle(value);
  }
  
    
    
  if(!user){return(<></>)}

  return(
    <>
      <button onClick={handleStartWebsocket}>ws接続開始</button>  
      <div className="page-body">
        <h2>this is EditorPage    ようこそ {user.displayName}</h2>
        <div className="document-title">
          <IoDocumentTextSharp color={"#4285f4"} size={40}/>  
          <input onChange={(e)=>onChangeTitleValue(e.target.value) } value={title} className="document-title-input"/>         
        </div>
       

        
        <EditorRenderer document={document} onChangeJsonContent={onChangeJsonContent} />
      </div>


      {loadState &&
      <Notification state={loadState} message={message} />
      }
      
      
    </>
  )
}