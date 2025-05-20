import { memo, type FC, type ReactElement } from "react";

type Props = {
  label: ReactElement,
  onClick: () => void;
}

export const TiptapToolbarButton: FC<Props> = memo((props) => {
  const { label, onClick } = props;


  return (
    <button 
      className="tiptap-toolbar-button"
      onClick={onClick}
    >
      {label}
    </button>
  )
})