import { type ReactElement } from "react"

import type { Editor } from "@tiptap/react"
import { MdRedo, MdSuperscript, MdUndo } from "react-icons/md"
import type { SelectOption } from "../types/selectOption"
import { TfiSmallcap } from "react-icons/tfi";
import { BiHighlight } from "react-icons/bi";

type ButtonType = "separator" | "button" | "pulldown"

type TiptapButtonType = {
  label: ReactElement,
  onClick :()=> void,
  onClickOption?: (option: SelectOption | null) => void,
  buttonType: ButtonType
}

const fontSizeList= ['9','12', '14', '16', '20', '25', '40']
export const fontSizeOptions: SelectOption[] = fontSizeList.map(item=> ({label:item, value: item}));

export const useTiptapToolBar = (editor: Editor | null) => {
  // const [fontSize, setFontSize] = useState('14');

  const handleClickFontSizeOption = (option: SelectOption | null)=>{
    if(!editor || !option) return;
    const number = Number(option.value);
    const resultSize = !number? '14' : number<5? '5' :number>50? '50': `${number}`;
    editor.commands.setFontSize(`${resultSize}px`);
  }
  
  const buttonsList: TiptapButtonType[] = editor? [
    {label: <MdUndo /> , buttonType: "button",  onClick: ()=> editor.chain().focus().undo().run()},
    {label: <MdRedo /> , buttonType: "button", onClick: ()=> editor.chain().focus().redo().run()},
    {label: <></>, onClick: ()=>{}, buttonType: "separator" },
    {label: <b>B</b> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleBold().run()},
    {label: <i>I</i> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleItalic().run()},
    {label: <u>U</u> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleUnderline().run()},
    {label: <s>S</s> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleStrike().run()},
    {label: <BiHighlight /> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleHighlight().run()},
    {label: <MdSuperscript /> ,buttonType: "button", onClick: ()=> editor.chain().focus().toggleStrike().run()},
    {label: <></>, onClick: ()=>{}, buttonType: "separator"},
    {label: <TfiSmallcap color="black"/> ,buttonType: "pulldown", onClick: ()=>{}, onClickOption: handleClickFontSizeOption}, //labelをplaceholderとするプルダウンを生成
    {label: <></>, onClick: ()=>{}, buttonType: "separator"},
  ]: []




  return { buttonsList }
}