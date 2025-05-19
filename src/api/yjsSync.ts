import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import type { JSONContent } from '@tiptap/react';
import type { AppDispatch } from '../store';
import { markDirty, saveDocumentRequest } from '../store/document/slice';
import type { DocType } from '../types/document';



export type YjsContentMap = {
  title: string;
  jsonContent: JSONContent;
};

export let ydoc: Y.Doc | null = null;
export let provider: WebsocketProvider | null = null;



const colorPalette = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'
]

const getUsedColors= () =>{
  const awareness = (ydoc && provider)? provider.awareness : null
  if(!awareness) return console.error("awareness undefined");
  const usedColors = new Set<string>()
  awareness.getStates().forEach(state => {
    if (state.user && state.user.color) {
      usedColors.add(state.user.color)
    }
  })
  return usedColors
}

// 空いている色を探して返す
export const assignColor=(): string => {
  const usedColors = getUsedColors()
  if(!usedColors) {
    console.log("no color used")
    return '#fabebe'
  }
  console.log(usedColors)
  for (const color of colorPalette) {
    if (!usedColors.has(color)) {
      console.log("setting color", color)
      return color
    }
  }
  // パレットが足りなければランダムに返す
  return colorPalette[Math.floor(Math.random() * colorPalette.length)]
}
export const assignRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}


// export const setYjsUser = (user: UserType) => {
//   if(!awareness) return console.error("awareness undefined");
//   const color = assignColor();
//   awareness.setLocalStateField('user', {
//     id: user.uid,
//     name: user.displayName,
//     color
//   });
// }

export const initYjsConnection = (roomId: string) => {
  try{
    if (ydoc || provider) return; // 再初期化防止

    ydoc = new Y.Doc();
    provider = new WebsocketProvider('ws://localhost:1234', roomId, ydoc);

    provider.on('status', (event: { status: string }) => {
      console.log(`Yjs WebSocket connection status: ${event.status}`);
    });
    return ydoc;

  }catch (error){

  }

};

// YjsのMap取得関数
export const getYjsContentMap = (): Y.Map<any> => {
  if (!ydoc) throw new Error('Yjs document is not initialized');
  const ymap = ydoc.getMap('content');
  return ymap;
};

// titleを書き込む
export const updateTitle = (title: string) => {
  const ymap = getYjsContentMap();
  ymap.set('title', title);
};

// content(JSONContent)を書き込む
export const updateJsonContent = (content: JSONContent) => {
  const ymap = getYjsContentMap();
  ymap.set('jsonContent', content);
};

// 外部から内容を初期化（Firestore取得後）
export const initYjsContent = (data: YjsContentMap) => {
  const ymap = getYjsContentMap();
  ymap.set('title', data.title);
  ymap.set('jsonContent', data.jsonContent);
};

// Ydocの取得（保存などに使用可能）
export const getYdoc = (): Y.Doc => {
  if (!ydoc) throw new Error('Yjs document is not initialized');
  return ydoc;
};

//保存処理の発火(saga側でデバウンス処理)
export const handleFireStoreSync = (dispatch: AppDispatch) => {
  if(!ydoc) return;
  ydoc.on('update',() => {
    dispatch(markDirty())
  })
}

export const exportYjsSnapshot = (updatedBy: string): DocType => {
  // 1. Yjs doc & Map を取得
  const ydoc: Y.Doc          = getYdoc()
  const ymap: Y.Map<any>     = getYjsContentMap()

  // 2. 各フィールドを安全に取り出し
  const title        = ymap.get('title')        as string | undefined
  const jsonContent  = ymap.get('jsonContent')  as any     | undefined

  // 3. Firestore に書き込む形へ整形
  const snapshot: DocType = {
    id          : ydoc.guid,          // or Firestore docId
    title       : title ?? '',
    createdBy   : ymap.get('createdBy') ?? updatedBy,
    collaborators: ymap.get('collaborators') ?? [],
    jsonContent  : jsonContent ?? { type: 'doc', content: [] },
    createdAt   : ymap.get('createdAt') ?? new Date().toISOString(),
    updatedAt   : new Date().toISOString(),
  }

  return snapshot
}