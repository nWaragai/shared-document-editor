import { doc, getDoc } from "firebase/firestore";
import type { DocMeta, DocType } from "../types/document";
import { db } from "./fireconfig";
import type { JSONContent } from "@tiptap/react";


//既存のドキュメントリストから選択時に取得

export const fetchDocumentContentFromFireStore = async(meta: DocMeta): Promise<DocType> => {
  try{
    const queryId = meta.id;
    const snapshot = await getDoc(doc(db, "documents", queryId, 'content', 'main'));

    let jsonContent: JSONContent = { type: 'doc', content: [] } //初期値

    if (snapshot.exists()) {
      // Firestore 側は { data: <JSONContent> } という構造
      const raw = snapshot.data()?.content
      if (raw) jsonContent = raw as JSONContent
    }
    
    const result: DocType = {
      ...meta,
      jsonContent,
    };

    return result

  }catch(error){
    console.error("failed fetching document", meta.title, error);
    throw error
  }
}