import { memo, type FC } from "react";
import { TipTap } from "./TipTap";

import type { DocType } from "../../../types/document";
import type { JSONContent } from "@tiptap/react";


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
}



export const EditorRenderer: FC<Props> = (props) => {
  const { document, onChangeJsonContent} = props;
  
  return (
    <div className="editor-document-container">
      {document && 
        <TipTap content={document.jsonContent} onChange={onChangeJsonContent}/>
      }
    </div>
  )
}