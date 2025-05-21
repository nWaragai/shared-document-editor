import { memo, type FC, type ReactElement } from "react";

type Props = {
  label: ReactElement,
  onClick: () => void;
  color? : string;
}

export const TiptapToolbarButton: FC<Props> = memo((props) => {
  const { label, onClick, color } = props;


  return (
    <button 
      className="tiptap-toolbar-button"
      onClick={onClick}
    >
      <div style={{color}}>{label}</div>
    </button>
  )
})