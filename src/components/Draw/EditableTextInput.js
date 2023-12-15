import React, { useState } from "react";
import { Html } from "react-konva-utils";

function getStyle(
  width,
  height,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,
  textDecoration
) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height - 50}px`,
    border: "none",
    padding: "10px 20px",
    margin: "5px",
    background: "none",
    outline: "none",
    overflow:"hidden",
    textDecoration:textDecoration?"underline":"none",

    color: "black",
    fontSize: `${fontSize}px`,

    fontFamily: fontFamily,
    textAlign: textAlign,
    fontStyle: italic ? "italic" : "normal",
    fontWeight: fontWeight ? "bold" : "normal",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: "-4px",
  };
}

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  setNewHeight,
  setNewWidth,
  onChange,
  onKeyDown,
  isEditing,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,
  textDecoration
}) {
  const [inputValue, setInputValue] = useState(value);
  const [disable, setDisable] = useState(false);


  const style = getStyle(
    width,
    height,
    fontSize,
    italic,
    textAlign,
    fontWeight,
    fontFamily,
    textDecoration
  );


  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
    autoAdjust(event.target);
    setNewHeight(calculateTextAreaHeight())
  };

  const handleEscapeKeys = (e) => {
    if (e.keyCode === ESCAPE_KEY) {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      // Call any necessary logic here after Enter key press
      setDisable(true);
      // alert("enter")
    }
  };
  const calculateTextAreaHeight = () => {
    const textarea = document.getElementById('myTextarea'); 
    if (textarea) {
      const { scrollHeight, clientHeight,scrollWidth,clientWidth } = textarea;
      const extraHeight = Math.max(scrollHeight, clientHeight)-height;
      const extraWidth = Math.max(scrollWidth, clientWidth)-width;
      setNewWidth(extraWidth)
      if (extraHeight > 0){
        return extraHeight;
      }
    }
    return 0;
  };

  const autoAdjust = (element) => {
    element.style.width = 'auto';
    element.style.width = `${element.scrollWidth}px`;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };
  return (
    <Html groupProps={{ x, y }} divProps={{ backgroundColor: "red" }}>
      <textarea
      id="myTextarea"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleEscapeKeys}
        
        // onKeyDown={onkeydown}
        style={style}
        disabled={disable} // Disable the textarea if editing is not enabled
      />
    </Html>
  );
}
