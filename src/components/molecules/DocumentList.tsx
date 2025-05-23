import { memo, useEffect, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { DocMeta } from "../../types/document";
import { fetchDocListRequest, fetchDocumentRequest } from "../../store/document/slice";
import { BeatLoader } from "react-spinners";

import { wsConnectRequest } from "../../store/ws/slice";


import { AiFillCloseSquare } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";




export const DocumentListContainer: FC = memo(() => {
  const [open, setOpen] = useState<Boolean>(false);

  const wsSuccess = useSelector((state: RootState)=> state.yjsWebsocket.notification.wsConnect.success);

  const user = useSelector((state: RootState)=> state.auth.user);
  const roomId = useSelector((state:RootState) => state.document.document?.roomId);
  const documentList = useSelector((state: RootState)=> state.document.availableDocs);
  const document = useSelector((state: RootState)=> state.document.document);
  const loading = useSelector((state: RootState)=> state.document.notification.fetchDocument.loading);
  const dispatch = useDispatch()

  const onClickElement = (docmeta: DocMeta) => {
    dispatch(fetchDocumentRequest(docmeta));
    setOpen(false);
  }
  const onClickFetchList = () => {
    setOpen(true);
    dispatch(fetchDocListRequest());
  }

  //firestoreからfetchされたら接続開始
  useEffect(()=> {
    if(!roomId || roomId==="none" || !user?.displayName) return;
    dispatch(wsConnectRequest({roomId: roomId, userName: user.displayName}));
    console.log("connected to", roomId, user.displayName);
  },[roomId, user])
  
  //接続成功したらyjs初期化されていないかを確認


  return (
    <div className="document-list-area">
      <FaFolder size={55} onClick={onClickFetchList} color="#f5f5f5" className="document-list-fetch-button"/>
      {open &&
      <div className="document-list-dropdown">
        {loading? <BeatLoader /> : 
        <>
          <AiFillCloseSquare color="red" onClick={()=>setOpen(false)} className="close-window-button"/>
          <div className="document-list-container">
          {documentList.map(doc => (
            <div 
              key={doc.id}
              className="document-list-element"
              onClick={()=>onClickElement(doc)}
            >{doc.title}</div>
            ))}
          </div>
        </>
        }
      </div>
      }
    </div>
  )
} )