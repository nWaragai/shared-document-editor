import { memo, type FC } from "react";
import { DocumentListContainer } from "../DocumentList";
import type { Editor } from "@tiptap/react";
import { TiptapToolbarButton } from "../../atoms/buttons/tiptap/TipTapToolbarButton";
import { useTiptapToolBar } from "../../../hooks/useTiptapToolbar";
import { ToolboxPulldown } from "./ToolBoxPulldown";
import { ToolboxColorPicker } from "./ToolboxColorPicker";
import {FaFileExport, FaFolderPlus} from "react-icons/fa"

import { SaveStateMessage } from "./SaveStateMessage";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useExportToPdf } from "../../../hooks/useExportToPdf";

type Props = {
  onClickNewFile : () => void;
  editor: Editor | null;
}

export const ToolBar: FC<Props> = memo((props) => {
  const { editor, onClickNewFile } = props
  const { buttonsList } = useTiptapToolBar(editor);
  const documentTitle = useSelector((state: RootState) => state.document.document?.title) ?? "無題のドキュメント"
  const { exportTiptapToPdf } = useExportToPdf();

  return(
    <div className="toolbar-area">
      <div className="toolbar-filebuttons">
        <FaFolderPlus size={55} color="#f5f5f5" onClick={onClickNewFile}/>
        <DocumentListContainer />
        {editor && 
        <FaFileExport onClick={()=>exportTiptapToPdf(documentTitle)} size={50} color="#f5f5f5" />
        }
        <SaveStateMessage />
        <></>
      </div>
      {editor && 
        <div className="tiptap-toolbar-area">
          {buttonsList.map((item, index) => 
            <div key={`${item.buttonType}-${index}`}>{
            item.buttonType === "separator"? 
            <div className="tiptap-toolbar-separator"/> : 
            item.buttonType === "button"?
            <TiptapToolbarButton label={item.label} onClick={item.onClick}/> :
            (item.buttonType === "pulldown" && item.onClickOption && item.optionList)?
            <ToolboxPulldown list={item.optionList} placeholder={item.label} handleSelect={item.onClickOption} className="toolbar-fontsize-selector"/>:
            (item.buttonType === "colorPicker" && item.onClickColor)? 
            <ToolboxColorPicker label={item.label} onChangeColor={item.onClickColor}/> :
            null
            }
            </div>
            )}
        </div>      
      }


    </div>
  )
})