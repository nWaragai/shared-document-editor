import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./fireconfig";
import type { DocMeta } from "../types/document";


export const fetchDocListFromFireStore = async(): Promise<DocMeta[]> => {
  try{
    const metaQuery = query(collection(db, "documents"), orderBy("updatedAt", "asc"), limit(20));
    const metaSnap = await getDocs(metaQuery);
    const DocList: DocMeta[] = [];

    metaSnap.forEach(doc=> {
      const meta = doc.data();
      const result: DocMeta = {
        id: meta.id,
        createdAt: meta.createdAt,
        updatedAt: meta.updatedAt,
        title: meta.title,
        createdBy: meta.createdBy,
        collaborators: meta.collaborators,
      };
      DocList.push(result);
    })

    return DocList;
  }catch(error){
    console.error("failed fetching doc list", error);
    return [];
  }
}