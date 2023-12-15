import React from "react";
import { ResizableText } from "./ResizableText";
import { EditableTextInput } from "./EditableTextInput";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableText({
  x,
  y,
  isEditing,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onChange,
  onResize,
  text,
  width,
  height,
  setNewHeight,
  setNewWidth,
  onKeyDown,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,onTextDecoration
}) {
  if (isEditing) {
    return (
      <EditableTextInput
        x={x+10}
        y={y+10}
        width={width}
        height={height}
        setNewHeight={setNewHeight}
        setNewWidth={setNewWidth}
        value={text}
        onChange={onChange}
        fontSize={fontSize}
        italic={italic}
        textAlign={textAlign}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        textDecoration={onTextDecoration}
        // onKeyDown={onKeyDown}
      />
    );
  }
  return (
    <ResizableText
      x={x}
      y={y}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onDoubleClick={onToggleEdit}
      onResize={onResize}
      text={text}
      width={width}
    />
  );
}
