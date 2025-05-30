import type { JSONContent } from "@tiptap/react";


export type DocType = {
  id: string,               //ドキュメントid
  title: string,
  createdBy: string,        //作成者id
  collaborators: string[],  //共同作業者id
  jsonContent: JSONContent,
  createdAt: string,
  updatedAt: string,
  roomId: string,
};
export type DocMeta = {
  id: string,               //ドキュメントid
  title: string,            //タイトル
  createdBy: string,        //作成者id
  collaborators: string[],  //共同作業者id
  createdAt: string,
  updatedAt: string,
  roomId: string,
}

export type UserType = {
  uid: string,
  displayName: string,
  email: string,
}

export type YDocMeta = {
  documentId: string,
  roomId: string,
}

export type LoginRequirements = {
  email: string;
  password: string;
  displayName?: string;
}

