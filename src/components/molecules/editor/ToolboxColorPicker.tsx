import { memo, useEffect, useRef, useState, type FC, type ReactElement } from "react";
import { HexColorPicker } from "react-colorful";
import { TiptapToolbarButton } from "../../atoms/buttons/tiptap/TipTapToolbarButton";


type Props ={
  label: ReactElement,
  onChangeColor: (color: string)=>void;
}

export const ToolboxColorPicker : FC<Props> = memo((props) => {
  const {onChangeColor, label} = props;
  const [ color, setColor ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    const handleClickOutside = (event: MouseEvent)=> {
      if(pickerRef.current && !pickerRef.current.contains(event.target as Node)){
        setIsOpen(false);
      }
    };
    if(isOpen){
      document.addEventListener("mousedown", handleClickOutside);
    }
    return()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[isOpen])

  const handleChange = (color: string)=> {
    setColor(color);
    onChangeColor(color);
  }
  const onClickOpen = () => {
    onChangeColor(color);
    setIsOpen(true);
  }

  return(
    <div className="toolbar-colorPicker-wrapper">
      
      <TiptapToolbarButton label={label} onClick={onClickOpen} color={color}/>
      {isOpen &&
      <div className="toolbar-colorPicker" ref={pickerRef}>
        <HexColorPicker color={color} onChange={handleChange} />
      </div>
      }
    </div>
    
  )
})