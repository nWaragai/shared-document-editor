import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Node, type JSONContent } from '@tiptap/react';
import type { AppDispatch } from '../store';
import { markDirty } from '../store/document/slice';
import type { DocType } from '../types/document';





export type YjsContentMap = {
  title: string;
  jsonContent: JSONContent;
};

export let ydoc: Y.Doc | null = null;
export let provider: WebsocketProvider | null = null;

export const getYjsState = () => {
  return {ydoc, provider}
}

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

export const initYjsConnection = (roomId?: string, user?: string) => {
  try{
    if (ydoc || provider) return; // 再初期化防止
    const id = roomId || `room-${crypto.randomUUID()}`
    ydoc = new Y.Doc();
    provider = new WebsocketProvider('ws://localhost:1234', id, ydoc);
    console.log("created new ydoc and provider")

    provider.on('status', (event: { status: string }) => {
      console.log(`Yjs WebSocket connection status: ${event.status}`);
    });

    //新規作成時
    if(!roomId){
      const ymap = getYjsContentMap();
      const userName = user || 'unknownUser';
      ymap.set('docId', `doc-${crypto.randomUUID()}`);
      ymap.set('createdBy', userName);
      ymap.set('createdAt', new Date().toISOString());
      ymap.set('roomId', id);
    }

  }catch (error){
    throw error;
  }

};


//復旧する関数
export const restoreYjsFromRedux = (reduxDoc: DocType) => {
  if(!ydoc) return console.log("connect to yjs");
  
  // 1. ydocの状態サイズをチェック（update sizeが0なら空）
  const ymap = getYjsContentMap();
  const content: any = ymap.get("jsonContent");
  const title: any = ymap.get("title");
  console.log("title", title, "content", content, "ymap", ymap);
  if((title || content)){
    console.log('Yjs document already initialized.');
    return;
  }
  
  const stateUpdate = Y.encodeStateAsUpdate(ydoc);
  if (stateUpdate.length > 0) {
    // 既に初期化済みの状態があるので復旧不要
 
  }

  // 2. reduxDoc.jsonContentが存在することを確認
  if (!reduxDoc.jsonContent) {
    console.warn('No jsonContent to restore from.');
    return;
  }

  //復旧
  
  ymap.set('title', reduxDoc.title);
  ymap.set('docId', reduxDoc.id);
  ymap.set('collaborators', reduxDoc.collaborators);
  ymap.set('createdBy', reduxDoc.createdBy);
  ymap.set('updatedAt', reduxDoc.updatedAt);
  ymap.set('roomId', reduxDoc.roomId);
  ymap.set('jsonContent', reduxDoc.jsonContent);

  

  //tip-tap yjs連携用の復旧
  Object.entries(reduxDoc.jsonContent).forEach(([key,value])=> {
    ymap.set(key, value);
  });

  console.log('Yjs document restored from Redux.');
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
  // const ydoc: Y.Doc          = getYdoc()
  const ymap: Y.Map<any>     = getYjsContentMap()

  // 2. 各フィールドを安全に取り出し
  const title        = ymap.get('title')        as string | undefined
  const jsonContent  = ymap.get('jsonContent')  as any     | undefined
  if(!jsonContent) console.log("failed save!jsonContent undefined!");


  // 3. Firestore に書き込む形へ整形
  const snapshot: DocType = {
    id          : ymap.get('docId') ?? `corruptedId`,          // or Firestore docId
    title       : title ?? '',
    createdBy   : ymap.get('createdBy') ?? updatedBy,
    collaborators: ymap.get('collaborators') ?? [],
    jsonContent  : jsonContent ?? { type: 'doc', content: [] },
    createdAt   : ymap.get('createdAt') ?? new Date().toISOString(),
    updatedAt   : new Date().toISOString(),
    roomId      : ymap.get('roomId') ?? `corruptedId`
  }


  return snapshot
}


export const disconnectYjs = () => {
  if(!ydoc || !provider) return console.log("no previous connection");
  provider.disconnect();
  provider.destroy();
  ydoc.destroy();
  provider = null;
  ydoc = null;
  

  console.log("destoryed ydoc", ydoc);
}