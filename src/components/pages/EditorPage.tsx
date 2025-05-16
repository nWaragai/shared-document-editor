import { useEffect, type FC } from "react";
import { EditorRenderer } from "../organisms/editor/EditorRenderer";
import { Notification } from "../molecules/Notification";
import { useNotification } from "../../hooks/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { wsConnectRequest } from "../../store/ws/slice";
import { initializeDocument } from "../../store/document/slice";
import type { RootState } from "../../store";
import { useUploadToYjs } from "../../hooks/useUploadToYjs";
import { BeatLoader } from "react-spinners";




export const EditorPage: FC = () => {
  const { loadState, message } = useNotification();
  const user = useSelector((state: RootState)=> state.auth.user);
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

  
    
    
  if(!user){return(<></>)}

  return(
    <>
      <button onClick={handleStartWebsocket}>ws接続開始</button>  
      <div className="page-body">
        <h2>this is EditorPage</h2>
        <h3>ようこそ {user.displayName}</h3>
        <div className="document-title">
          {document && 
          <>
            <label>タイトル:</label>
            <input onChange={()=>{}} value={document&& document?.title} className="document-title-input"/>         
          </>
          }
        </div>
        
        <EditorRenderer document={document} onChangeJsonContent={onChangeJsonContent} />
      </div>


      {loadState &&
      <Notification state={loadState} message={message} />
      }
      
      
    </>
  )
}