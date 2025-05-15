import { memo, type FC } from "react";
import { BubbleMenu, EditorProvider, FloatingMenu, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


type Props = {
  content: JSONContent
}

export const TipTap:FC<Props> = memo((props) => {
  const { content } = props;
  const extensions = [StarterKit];

  return(
    <EditorProvider extensions={extensions} content={content}>
      <FloatingMenu editor={null}>This is the FloatingMenu</FloatingMenu>
      <BubbleMenu editor={null}>This is the BubbleMenu</BubbleMenu>
    </EditorProvider>
  )

})