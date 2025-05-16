import { useDispatch } from "react-redux";
import type { JSONContent } from "@tiptap/react";
import { wsSendJsonContent, wsSendTitle } from "../store/ws/slice";

export const useUploadToYjs = () => {
  const dispatch = useDispatch();
  const onChangeJsonContent = (content: JSONContent) => {
    dispatch(wsSendJsonContent(content));
  }
  const onChangeTitle = (title: string) => {
    dispatch(wsSendTitle(title));
  }



  return{ onChangeJsonContent, onChangeTitle }
}