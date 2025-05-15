import type { JSONContent } from "@tiptap/react";


export type DocumentType = {
  id: string,               //ドキュメントid
  title: string,
  createdBy: string,        //作成者id
  collaborators: string[],  //共同作業者id
  content: JSONContent,
  createdAt: string,
  updatedAt: string,
};

export type UserType = {
  uid: string,
  displayName: string,
  email: string,
}

export type YDocMeta = {
  documentId: string,
  roomId: string,
}

