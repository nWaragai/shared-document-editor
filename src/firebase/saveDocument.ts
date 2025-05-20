import { collection, doc, setDoc, writeBatch } from "firebase/firestore";

import { db } from "./fireconfig";
import type { DocType } from "../types/document";


export const saveDocumentToFireStore = async(document: DocType) => {
  try{
    const {jsonContent, ...meta} = document;
    const batch = writeBatch(db);

    const contentRef = doc(collection(db, "documents"), document.id, 'content', 'main');
    const metaRef = doc(collection(db, "documents"), document.id);

    batch.set(metaRef, meta, {merge: true});
    batch.set(contentRef, {content: jsonContent});

    console.log("saving document");
    await batch.commit();

  }catch(error){
    console.error("ドキュメントの保存に失敗しました",error)
    throw error;
  }
}

