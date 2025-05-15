import type { FC } from "react";
import { EditorRenderer } from "../organisms/editor/EditorRenderer";


export const EditorPage: FC = () => {
  return(
    <>
    
      <div className="page-body">
        <h2>this is EditorPage</h2>
        <EditorRenderer />
      </div>
      
    </>
  )
}