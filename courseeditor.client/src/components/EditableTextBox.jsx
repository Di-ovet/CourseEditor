import "../styles.css";

/**
 * A generic text input that starts off readOnly and becomes editable on double-click.
 * It forwards common props and adds an `onEnter` callback for the Enter key.
 */
function EditableTextBox({
  text,
  readOnly = true,
  id,
  className,
  placeholder,
  defaultValue,
  value,
  onDoubleClick,
  onBlur,
  onEnter,
  onInput,
  onChange,
  ...rest
}) {
  const startEdit = (e) => {
    e.target.removeAttribute("readOnly");
    if (onDoubleClick) onDoubleClick(e);
  };

  const stopEdit = (e) => {
    e.target.setAttribute("readOnly", true);
    if (onBlur) onBlur(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (onEnter) onEnter(e);
      // optionally blur the field to trigger stopEdit
      e.target.blur();
    }
  };

  return (
    <input
      readOnly={readOnly}
      id={id}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue ?? text}
      value={value}
      onDoubleClick={startEdit}
      onBlur={stopEdit}
      onKeyDown={handleKeyDown}
      onInput={(e) => {
        if (onInput) onInput(e);
      }}
      onChange={(e) => {
        if (onChange) onChange(e);
      }}
      {...rest}
    />
  );
}

export default EditableTextBox;
