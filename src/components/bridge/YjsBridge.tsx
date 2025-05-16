// YjsBridge.tsx
import { useYjs } from "../../context/yjsContext";
import { useEffect } from 'react';

export const YjsBridge = () => {
  const { setYdoc } = useYjs();

  useEffect(() => {
    // グローバル関数経由で Saga → Context を可能にする
    (window as any).__SET_YJS_CONTEXT__ = setYdoc;
    return () => {
      delete (window as any).__SET_YJS_CONTEXT__;
    };
  }, [setYdoc]);

  return null;
};
