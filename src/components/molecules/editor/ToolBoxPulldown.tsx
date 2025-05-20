import { memo, type FC, type ReactElement } from "react";
import Select from "react-select";
import type { SelectOption } from "../../../types/selectOption";


type Props = {
  list: SelectOption[],
  placeholder: ReactElement,
  handleSelect: (value: SelectOption | null)=> void,
  className?: string,
}

export const ToolboxPulldown:FC<Props> = memo((props) => {
  const { list, placeholder, handleSelect, className } = props;

  return (
    <Select
      options={list}
      placeholder={placeholder}
      onChange={handleSelect}
      className={className}
      styles={{
        control: (baseStyles, _) =>({
          ...baseStyles,
          maxHeight: "30px !important",
          minHeight: "10px",
          fontSize: "12px",
          backgroundColor: "transparent",
          color: "black",
          border: "transparent",
          boxShadow: "none !important",
          overflow: "hidden"
        })
      }}
    />
  )
})