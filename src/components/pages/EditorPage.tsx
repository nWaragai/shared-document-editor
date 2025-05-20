import { useEffect, useState, type FC } from "react";
import { EditorRenderer } from "../organisms/editor/EditorRenderer";
import { Notification } from "../molecules/Notification";
import { useNotification } from "../../hooks/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { wsConnectRequest } from "../../store/ws/slice";
import { initializeDocument, markDirty } from "../../store/document/slice";
import type { RootState } from "../../store";
import { useUploadToYjs } from "../../hooks/useUploadToYjs";

import { getYjsContentMap } from "../../api/yjsSync";
import { IoDocumentTextSharp } from "react-icons/io5";


import type { Editor, JSONContent } from "@tiptap/react";
import { ToolBar } from "../molecules/editor/Toolbox";



export const EditorPage: FC = () => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const { loadState, message } = useNotification();
  const [title, setTitle] = useState<string>("");
  const user = useSelector((state: RootState)=> state.auth.user);
  const success = useSelector((state: RootState)=> state.yjsWebsocket.notification.wsConnect.success);
  const dispatch = useDispatch();

  const handleStartWebsocket = (roomId?: string) => {
    if(!user) return;
    dispatch(wsConnectRequest({userName: user?.displayName, roomId: roomId
    }));
  }



  const document = useSelector((state: RootState)=> state.document.document)
  const { onChangeJsonContent, onChangeTitle } = useUploadToYjs();
  useEffect(()=>{
    if(document)return console.log("document exists");
    console.log("creating initital document");
    dispatch(initializeDocument());
  },[document]);

  



  useEffect(()=> {
    if(!success) return console.log("already initailized title");
    const ymap = getYjsContentMap();
    const handleChange = () => {
      const newTitle = ymap.get('title') || '';
      setTitle(newTitle);
      console.log("setting new title", newTitle)
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
      
      <ToolBar onClickNewFile={()=> handleStartWebsocket()} editor={editor}/>
      <div className="page-body">
        <h2>this is EditorPage    ようこそ {user.displayName}</h2>
        <div className="document-title" key={`title-${document?.id}` || "default"}>
          <IoDocumentTextSharp color={"#4285f4"} size={40}/>  
          <input 
            onChange={(e)=>{
              onChangeTitleValue(e.target.value);
              dispatch(markDirty()); 
            }} 
            value={title} 
            className="document-title-input"
          />         
        </div>
       

        
        <EditorRenderer 
          key={document?.id || "default"}
          document={document} 
          onChangeJsonContent={(content: JSONContent)=> {dispatch(markDirty()); onChangeJsonContent(content)} }
          setEditor={setEditor}
        />
      </div>


      {loadState &&
      <Notification state={loadState} message={message} />
      }
      
      
    </>
  )
}