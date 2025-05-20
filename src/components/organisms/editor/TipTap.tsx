import { memo, useEffect, useMemo, type FC } from "react";
import { FloatingMenu, BubbleMenu, EditorContent, useEditor, type JSONContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import {  assignRandomColor, getYjsState } from "../../../api/yjsSync";

import { BeatLoader } from "react-spinners";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";


import type { UserType } from "../../../types/document";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { FloatingMenuButton } from "../../atoms/buttons/tiptap/FloatingMenuButton";
import Underline from "@tiptap/extension-underline";
import { IoMdCode } from "react-icons/io";

import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { FontSize } from "../../../extensions/FontSize";
import Highlight from '@tiptap/extension-highlight'



type Props = {
  content: JSONContent,
  onChange: (content : JSONContent) => void,
  user?: UserType,
  setEditor: (editor: Editor)=> void,
}





export const TipTap:FC<Props> = memo((props) => {
  const {ydoc, provider} = getYjsState();
  const  { onChange, setEditor } = props;

  if(!ydoc || !provider) return<>start ws<BeatLoader /></>
  const user = useSelector((state: RootState)=> state.auth.user);
  if(!user) return <>login failed</>
  // const { content, onChange } = props;
  
  const currentUser = useMemo(() => {
    if (!user) return null;
    return {
      id: user.uid,
      name: user.displayName,
      color: assignRandomColor(),
    };
  }, [user]);
  
  const editor = useEditor({extensions: [ 
    StarterKit.configure({ history: false }),
    FontSize,
    Underline,
    Highlight.configure({ multicolor: true }),
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({
      provider,
      user: currentUser!,
    }), 
   ],
   onUpdate: ({ editor })=>{
    onChange(editor.getJSON());
   }
  })


  useEffect(()=> {
    if(editor){
      setEditor(editor)
    }
  },[editor])
  // useEditor({
  //   extensions,
  //   content: content ?? undefined,
  //   onCreate: ({editor}) => {
  //     provider.connect()
  //   },
  //   onUpdate: ({ editor }) => {
  //     onChange(editor.getJSON());
  //   }
  // }) 
  

  //editorが変化するたびにyjsと同期
  // useEffect (()=> {
  //   if(!editor || !ydoc) return;
  //   const ymap = getYjsContentMap();
  //   const observer = (_event: Y.YMapEvent<JSONContent | string> ) => {
  //     const jsonContent = ymap.get('jsonContent');
  //     if(jsonContent){
  //       editor.commands.setContent(jsonContent);
  //     }
  //   };

  //   ymap.observe(observer);
  //   //クリーンアップ
  //   return() => {
  //     ymap.unobserve(observer);
  //   }
  // },[editor])


  return(
    <>
      {editor &&
        <>
        <EditorContent editor={editor}/>      
        <FloatingMenu editor={editor} className="tiptap-floating-menu">
          <FloatingMenuButton label={<>H1</>} onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}/>
          <FloatingMenuButton label={<>H2</>} onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}/>
          <FloatingMenuButton label={<>H3</>} onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}/>
          <FloatingMenuButton label={<GoListOrdered />} onClick={() => editor.chain().focus().toggleOrderedList().run()}/>
          <FloatingMenuButton label={<GoListUnordered />} onClick={() => editor.chain().focus().toggleBulletList().run()}/>
          <FloatingMenuButton label={<IoMdCode/>} onClick={() => editor.chain().focus().toggleCodeBlock().run()}/>
        </FloatingMenu>
        <BubbleMenu editor={editor} className="tiptap-bubble-menu">
          <FloatingMenuButton label={<b>B</b>} onClick={() => editor.chain().focus().toggleBold().run()}/>
          <FloatingMenuButton label={<i>I</i>} onClick={() => editor.chain().focus().toggleItalic().run()}/>
          <FloatingMenuButton label={<u>U</u>} onClick={() => editor.chain().focus().toggleUnderline().run()}/>  
          <FloatingMenuButton label={<s>S</s>} onClick={() => editor.chain().focus().toggleStrike().run()}/>  
        </BubbleMenu>      
        </>
      }
    </>
  )
})