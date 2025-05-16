import { memo, useMemo, type FC } from "react";
import { BubbleMenu, EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import {  assignRandomColor, provider, ydoc } from "../../../api/yjsSync";

import { BeatLoader } from "react-spinners";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";


import type { UserType } from "../../../types/document";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";





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
        {/* <FloatingMenu editor={editor}>This is the FloatingMenu</FloatingMenu> */}
        <BubbleMenu editor={editor}>This is the BubbleMenu</BubbleMenu>      
        </>
      }
    </>
  )
})