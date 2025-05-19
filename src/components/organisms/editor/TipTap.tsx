import { memo, useMemo, type FC } from "react";
import { FloatingMenu, BubbleMenu, EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import {  assignRandomColor, provider, ydoc } from "../../../api/yjsSync";

import { BeatLoader } from "react-spinners";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";


import type { UserType } from "../../../types/document";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { FloatingMenuButton } from "../../atoms/buttons/tiptap/FloatingMenuButton";
import Underline from "@tiptap/extension-underline";
import { IoMdCode } from "react-icons/io";
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered, GoListUnordered } from "react-icons/go";





type Props = {
  content: JSONContent,
  onChange: (content: JSONContent) => void,
  user?: UserType,
}

export const TipTap:FC<Props> = memo((props) => {
  if(!ydoc) return<>start ws<BeatLoader /></>
  const user = useSelector((state: RootState)=> state.auth.user);
  if(!user) return <>login failed</>

  const currentUser = useMemo(() => {
    
    return {
      id: user.uid,
      name: user.displayName,
      color: assignRandomColor(),
    };
  }, [user]);

  const { content, onChange } = props;
  const editor = useEditor( 
    {
    extensions:[
      StarterKit.configure({
        history: false,
      }),
      Underline,
      Collaboration.configure({
        document: ydoc
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: {
          id: currentUser.id, 
          name: currentUser.name,
          color: currentUser.color,
        }
      })
    ],
    content: content,
    onUpdate: ({ editor })=> {
      onChange(editor.getJSON())
    }
  })

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