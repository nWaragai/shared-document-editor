import { memo, type FC, type ReactElement } from "react";

type Props = {
  label: ReactElement,
  onClick: () => void;
}

export const FloatingMenuButton: FC<Props> = memo((props) => {
  const { label, onClick } = props;


  return (
    <button 
      className="tiptap-floating-menu-button"
      onClick={onClick}
    >
      {label}
    </button>
  )
})