import React, { createContext, useContext, useState, type FC, type PropsWithChildren } from "react";
import * as Y from 'yjs'

type YjsContextType = {
  ydoc: Y.Doc | null,
  setYdoc: React.Dispatch<React.SetStateAction<Y.Doc | null>>,
}

export const YjsContext = createContext<YjsContextType | null>(null);

export const useYjs = () => {
  const cxt = useContext(YjsContext);
  if(!cxt) throw new Error ("use context in provider");
  return cxt;
}

export const YjsContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  return(
  <YjsContext.Provider value={{ ydoc, setYdoc }}>
    {children}
  </YjsContext.Provider>
  )  
}