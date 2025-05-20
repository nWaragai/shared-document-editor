import { memo, type FC } from "react";
import { DocumentListContainer } from "../DocumentList";
import type { Editor } from "@tiptap/react";
import { TiptapToolbarButton } from "../../atoms/buttons/tiptap/TipTapToolbarButton";

type Props = {
  onClickNewFile : () => void;
  editor: Editor | null;
}

export const ToolBar: FC<Props> = memo((props) => {
  const { editor, onClickNewFile } = props

  return(
    <div className="toolbar-area">
      <div className="toolbar-filebuttons">
        <button onClick={onClickNewFile}>新規作成</button>
        <DocumentListContainer />
      </div>
      {editor && 
        <div className="tiptap-toolbar-area">
        <TiptapToolbarButton label={<b>B</b>} onClick={()=>  editor.chain().focus().toggleBold().run()} />
        <TiptapToolbarButton label={<i>I</i>} onClick={()=>  editor.chain().focus().toggleItalic().run()} />
        <TiptapToolbarButton label={<u>U</u>} onClick={()=>  editor.chain().focus().toggleUnderline().run()} />
        <TiptapToolbarButton label={<s>S</s>} onClick={()=>  editor.chain().focus().toggleStrike().run()} />
        <div className="tiptap-toolbar-separator" />
        </div>      
      }


    </div>
  )
})