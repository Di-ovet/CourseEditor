import { useState, useEffect } from "react";

const elementRegistry = {
  Text: TextElement,
  Image: ImageElement,
};

export { elementRegistry };

function TextElement({ id, data, onChange }) {
  const [text, setText] = useState(data?.text || "");

  useEffect(() => {
    setText(data?.text || "");
  }, [data]);

  const handleBlur = () => {
    if (text !== data?.text) {
      onChange({ ...data, text });
    }
  };

  return (
    <div className="element-text">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        className="element-textarea"
        placeholder="Введите текст..."
      />
    </div>
  );
}
export { TextElement };

function ImageElement({ id, data, onChange }) {
  const [url, setUrl] = useState(data?.url || "");
  const [caption, setCaption] = useState(data?.caption || "");

  useEffect(() => {
    setUrl(data?.url || "");
    setCaption(data?.caption || "");
  }, [data]);

  const handleUrlBlur = () => {
    if (url !== data?.url) {
      onChange({ ...data, url });
    }
  };

  const handleCaptionBlur = () => {
    if (caption !== data?.caption) {
      onChange({ ...data, caption });
    }
  };

  return (
    <div className="element-image">
      <div className="element-image-edit">
        <input
          type="text"
          placeholder="URL изображения"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={handleUrlBlur}
        />
        <input
          type="text"
          placeholder="Описание"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onBlur={handleCaptionBlur}
        />
      </div>
      {url && (
        <div className="element-image-preview">
          <img src={url} alt={caption || "Изображение"} />
          {caption && <p>{caption}</p>}
        </div>
      )}
    </div>
  );
}
export { ImageElement };
