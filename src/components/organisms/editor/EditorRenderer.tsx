import { memo, type FC } from "react";
import { TipTap } from "./TipTap";

const content = {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Hello, world!"
        }
      ]
    }
  ]
}



export const EditorRenderer: FC = memo(() => {


  return (
    <div className="editor-document-container">
      <TipTap content={content} />
    </div>
  )
})