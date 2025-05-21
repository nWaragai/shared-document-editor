import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DocMeta, DocType } from "../../types/document";
import type { NotificationGroup, NotificationState } from "../../types/notification";
import type { JSONContent } from "@tiptap/react";
import { notificationMessages } from "../../hooks/useNotificationMessages";


interface DocumentState {
  document: DocType | null,
  notification: {
    "fetchDocument": NotificationState,
    "saveDocument" : NotificationState
  },
  isDirty: boolean,
  availableDocs: DocMeta[],
  notificationMessage: string | null,
}

const initialState: DocumentState = {
  document: null,
  notification: {
    "fetchDocument":{
      type: "fetchDocument",
      loading: false,
      success: false,
      error: null,
    },
    "saveDocument":{
      type: "saveDocument",
      loading: false,
      success: false,
      error: null,
    },
  },
  isDirty: false,
  availableDocs: [],
  notificationMessage: null,

}

export const updateNotificationState = (
  notification: Partial<Record<NotificationGroup, NotificationState>>,
  mode: "request" | "success" | "error" | "cleanup",
  group: NotificationGroup,
  errorMessage?: string
) => {
  const n =notification[group];
  //groupがnotificationの引数に存在しない場合何もしない
  if(!n) return console.log("notification group not found");
  switch (mode){
    case "request":
      n.loading = true;
      n.success = false;
      n.error = null;
      break;
    case "success":
      n.loading = false;
      n.success = true;
      break;
    case "error":
      const message= errorMessage?? "error: errorMessageUndefined"
      n.error = message;
      n.loading = false;
      break;
    case "cleanup":
      n.loading = false;
      n.success = false;
      n.error = null;
      break; 
  }
}

export const documentSlice = createSlice({
  name: 'document',
  initialState: initialState,
  reducers:{
    fetchDocumentRequest(state, action: PayloadAction<DocMeta>){
      updateNotificationState(state.notification, "request", "fetchDocument");
    },
    fetchDocumentSuccess(state, action:PayloadAction<DocType>){
      state.document = action.payload;
      updateNotificationState(state.notification, "success", "fetchDocument");
    },
    fetchDocumentFailure(state, action:PayloadAction<string>){
      updateNotificationState(state.notification, "error", "fetchDocument", action.payload)
    },
    saveDocumentRequest(state, _: PayloadAction){
      updateNotificationState(state.notification, "request", "saveDocument");
      state.notificationMessage= notificationMessages["saveRequest"];
    },
    saveDocumentSuccess(state, _: PayloadAction){
      updateNotificationState(state.notification, "success", "saveDocument");
      state.isDirty = false;
      state.notificationMessage= notificationMessages["saveSuccess"];
    },
    saveDocumentFaliure(state, action: PayloadAction<string>){
      updateNotificationState(state.notification, "error", "saveDocument", action.payload);
    },
    setTitleFromYjs(state, action: PayloadAction<string>){
      if(!state.document) return;
      state.document.title = action.payload;
    },
    setJsonContentFromYjs(state, action: PayloadAction<JSONContent>){
      if(!state.document) return;
      state.document.jsonContent = action.payload;
    },
    initializeDocument(state, _: PayloadAction){
      state.document = defaultDocument;
    },
    markDirty(state, _: PayloadAction){
      state.isDirty = true;
    },
    fetchDocListRequest(state, action: PayloadAction){
      updateNotificationState(state.notification, "request", "fetchDocument");
    },

    fetchDocListSuccess(state, action: PayloadAction<DocMeta[]>){
      updateNotificationState(state.notification, "success", "fetchDocument");
      state.availableDocs = action.payload
    },

    fetchDocListFailure(state, action: PayloadAction<string>){
      updateNotificationState(state.notification, "error", "fetchDocument", action.payload);
    },
    
  }
})

export const defaultDocument: DocType = {
  title: "無題のタイトル",
  id: crypto.randomUUID(),
  createdBy: "dev",
  collaborators: ["dev"],  //共同作業者id
  jsonContent: {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Hello, world!"
          }
        ]
      }
    ]
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  roomId: "none",

}


export const { 
  fetchDocumentFailure,
  fetchDocumentRequest,
  fetchDocumentSuccess,
  saveDocumentFaliure,
  saveDocumentRequest,
  saveDocumentSuccess,
  setJsonContentFromYjs,
  setTitleFromYjs,
  initializeDocument,
  markDirty,
  fetchDocListRequest,
  fetchDocListFailure,
  fetchDocListSuccess,

} = documentSlice.actions;

export const documentReducer = documentSlice.reducer;

