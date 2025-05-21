import { type ReactElement } from "react"

import type { Editor } from "@tiptap/react"
import { MdLink, MdRedo, MdSuperscript, MdUndo } from "react-icons/md"
import type { SelectOption } from "../types/selectOption"
import { TfiSmallcap } from "react-icons/tfi";
import { BiFontColor, BiHighlight } from "react-icons/bi";
import { RxFontStyle} from "react-icons/rx"

type ButtonType = "separator" | "button" | "pulldown" | "colorPicker"

type TiptapButtonType = {
  label: ReactElement,
  onClick :()=> void,
  onClickOption?: (option: SelectOption | null) => void,
  onClickColor? : (color: string)=> void,
  optionList?: SelectOption[],
  buttonType: ButtonType,
}

const fontSizeList= ['9','12', '14', '16', '20', '30', '40', '50']
export const fontSizeOptions: SelectOption[] = fontSizeList.map(item=> ({label:item, value: item}));
export const styleOptions: SelectOption[] = [{label: "本文", value: "4"},{label: "見出し1", value: "1"}, {label: "見出し2", value: "2"},{label: "見出し3", value: "3"}]

export const useTiptapToolBar = (editor: Editor | null) => {
  // const [fontSize, setFontSize] = useState('14');

  const handleClickFontSizeOption = (option: SelectOption | null)=>{
    if(!editor || !option) return;
    const number = Number(option.value);
    const resultSize = !number? '14' : number<5? '5' :number>50? '50': `${number}`;
    editor.commands.setFontSize(`${resultSize}px`);
  }

  const handleClickStylesOption = (option: SelectOption | null) => {
    if(!editor || !option) return;
    const number = option.value;
    console.log(number);
    const resultSize = number === "1"? 1: number === "2"? 2: number === "3"? 3 : 4;
    if(resultSize <4){
      editor.chain().focus().setHeading({level: resultSize}).run();
    }else{
      editor.chain().focus().setParagraph().run();
    }
  }

  const setLink = () => {
    if(!editor) return;
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URLを入力してください', previousUrl);
    if(url === null) return;
    if(url ===''){
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }
  
  const buttonsList: TiptapButtonType[] = editor? [
    {label: <MdUndo /> , buttonType: "button",  onClick: ()=> editor.chain().focus().undo().run()},
    {label: <MdRedo /> , buttonType: "button", onClick: ()=> editor.chain().focus().redo().run()},
    {label: <></>, onClick: ()=>{}, buttonType: "separator" },
    {label: <RxFontStyle color="black" /> ,buttonType: "pulldown", onClick: ()=>{}, onClickOption: handleClickStylesOption , optionList:styleOptions }, 
    {label: <></>, onClick: ()=>{}, buttonType: "separator" },
    {label: <b>B</b> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleBold().run()},
    {label: <i>I</i> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleItalic().run()},
    {label: <u>U</u> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleUnderline().run()},
    {label: <s>S</s> , buttonType: "button", onClick: ()=> editor.chain().focus().toggleStrike().run()},
    {label: <BiHighlight style={{transform: "translateY(2px)"}}/> , buttonType: "colorPicker", onClick: ()=> editor.chain().focus().toggleHighlight().run(), onClickColor: (color)=>editor.chain().focus().toggleHighlight({color}).run()},
    {label: <MdSuperscript /> ,buttonType: "button", onClick: ()=> editor.chain().focus().toggleStrike().run()},
    {label: <></>, onClick: ()=>{}, buttonType: "separator"},
    {label: <BiFontColor style={{transform: "translateY(2px)"}} size={15}/> , buttonType: "colorPicker", onClick: ()=> {}, onClickColor: (color)=>editor.chain().focus().setColor(color).run()},
    {label: <TfiSmallcap color="black" /> ,buttonType: "pulldown", onClick: ()=>{}, onClickOption: handleClickFontSizeOption, optionList: fontSizeOptions }, //labelをplaceholderとするプルダウンを生成
    {label: <></>, onClick: ()=>{}, buttonType: "separator"},
    {label: <MdLink style={{transform: "translateY(4px)"}}/> ,buttonType: "button", onClick: setLink},

  ]: []




  return { buttonsList }
}