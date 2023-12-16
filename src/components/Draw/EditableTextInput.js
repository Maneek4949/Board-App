import React, { useState ,useEffect} from "react";
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
  };

  const handleEscapeKeys = (e) => {
    if (e.keyCode === ESCAPE_KEY) {
      e.preventDefault();
      setDisable(true);
    }
  };

  useEffect(() => {
    autoAdjust();
    setNewHeight(calculateTextAreaHeight());
  }, [inputValue]); // Run the effect whenever the inputValue changes

  const calculateTextAreaHeight = () => {
    const textarea = document.getElementById('myTextarea');
    if (textarea) {
      const { scrollHeight, clientHeight } = textarea;
      const extraHeight = Math.max(scrollHeight, clientHeight) - height;
      setNewWidth(textarea.scrollWidth-width); // Set the width without extra calculation
      return extraHeight > 0 ? extraHeight : 0;
    }
    return 0;
  };

  const autoAdjust = () => {
    const textarea = document.getElementById('myTextarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.width = `${inputValue.length+width}px`
    }
  };

  return (
    <Html groupProps={{ x, y }} divProps={{ backgroundColor: "red" }}>
      <textarea
        id="myTextarea"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleEscapeKeys}
        style={style}
        disabled={disable}
      />
    </Html>
  );
}