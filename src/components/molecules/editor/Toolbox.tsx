import { memo, type FC } from "react";
import { DocumentListContainer } from "../DocumentList";
import type { Editor } from "@tiptap/react";
import { TiptapToolbarButton } from "../../atoms/buttons/tiptap/TipTapToolbarButton";
import { fontSizeOptions, useTiptapToolBar } from "../../../hooks/useTiptapToolbar";
import { ToolboxPulldown } from "./ToolBoxPulldown";
import { ToolboxColorPicker } from "./ToolboxColorPicker";

type Props = {
  onClickNewFile : () => void;
  editor: Editor | null;
}

export const ToolBar: FC<Props> = memo((props) => {
  const { editor, onClickNewFile } = props
  const { buttonsList } = useTiptapToolBar(editor);

  return(
    <div className="toolbar-area">
      <div className="toolbar-filebuttons">
        <button onClick={onClickNewFile}>新規作成</button>
        <DocumentListContainer />
      </div>
      {editor && 
        <div className="tiptap-toolbar-area">
          {buttonsList.map(item=> item.buttonType === "separator"? 
            <div className="tiptap-toolbar-separator"/> : 
            item.buttonType === "button"?
            <TiptapToolbarButton label={item.label} onClick={item.onClick}/> :
            (item.buttonType === "pulldown" && item.onClickOption )?
            <ToolboxPulldown list={fontSizeOptions} placeholder={item.label} handleSelect={item.onClickOption} className="toolbar-fontsize-selector"/>:
            (item.buttonType === "colorPicker" && item.onClickColor)? 
            <ToolboxColorPicker label={item.label} onChangeColor={item.onClickColor}/> :
            null
            )}
        </div>      
      }


    </div>
  )
})