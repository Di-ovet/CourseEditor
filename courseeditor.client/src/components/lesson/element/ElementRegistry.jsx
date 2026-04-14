import { useState } from "react";

const elementRegistry = {
  Text: TextElement,
  Image: ImageElement,
};

export { elementRegistry };

function TextElement({ id, data, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const updatedData = { ...data, text: e.target.value };
    onChange(updatedData);
  };

  return (
    <div
      className="element-text"
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      tabIndex="0"
    >
      {isEditing ? (
        <textarea
          autoFocus
          value={data?.text || ""}
          onChange={handleChange}
          className="element-textarea"
        />
      ) : (
        <p>{data?.text || "(пусто)"}</p>
      )}
    </div>
  );
}
export { TextElement };

function ImageElement({ id, data, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUrlChange = (e) => {
    const updatedData = { ...data, url: e.target.value };
    onChange(updatedData);
  };

  const handleCaptionChange = (e) => {
    const updatedData = { ...data, caption: e.target.value };
    onChange(updatedData);
  };

  return (
    <div
      className="element-image"
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      tabIndex="0"
    >
      {isEditing ? (
        <div className="element-image-edit">
          <input
            autoFocus
            type="text"
            placeholder="URL изображения"
            value={data?.url || ""}
            onChange={handleUrlChange}
          />
          <input
            type="text"
            placeholder="Описание"
            value={data?.caption || ""}
            onChange={handleCaptionChange}
          />
        </div>
      ) : data?.url ? (
        <>
          <img src={data.url} alt={data.caption || "Image"} />
          {data.caption && <p>{data.caption}</p>}
        </>
      ) : (
        <p>Нет изображения</p>
      )}
    </div>
  );
}
export { ImageElement };
