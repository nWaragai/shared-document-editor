import { memo, type FC } from "react";
import { TipTap } from "./TipTap";

import type { DocType } from "../../../types/document";
import type { Editor, JSONContent } from "@tiptap/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";


// const content = {
//   "type": "doc",
//   "content": [
//     {
//       "type": "paragraph",
//       "content": [
//         {
//           "type": "text",
//           "text": "Hello, world!"
//         }
//       ]
//     }
//   ]
// }

type Props={
  document: DocType | null,
  onChangeJsonContent: (content: JSONContent) => void,
  setEditor: (editor: Editor)=> void;
}



export const EditorRenderer: FC<Props> = (props) => {
  const { document, onChangeJsonContent, setEditor} = props;
  const wsSuccess = useSelector((state: RootState)=> state.yjsWebsocket.notification.wsConnect.success);


  return (
    <div className="editor-document-container" id="tiptap">
      {document && wsSuccess && 
        <TipTap content={document.jsonContent} onChange={onChangeJsonContent} setEditor={setEditor} />
      }
    </div>
  )
}