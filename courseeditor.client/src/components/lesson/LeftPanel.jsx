import { useNavigate, Link } from "react-router-dom";
import "./LeftPanel.css";

const LeftPanel = () => {
  const navigate = useNavigate();
  const elementTypes = [
    { id: "text", label: "Text", icon: "📝" },
    { id: "image", label: "Image", icon: "🖼️" },
    { id: "video", label: "Video", icon: "🎥" },
    { id: "quiz", label: "Quiz", icon: "❓" },
    { id: "heading", label: "Heading", icon: "📌" },
    { id: "code", label: "Code Block", icon: "💻" },
  ];

  const handleDragStart = (e, elementType) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("elementType", elementType);
  };

  return (
    <div className="left-panel">
      <Link className="back-button" onClick={() => navigate(-1)}>
        ← Назад
      </Link>

      <h2>Add Elements</h2>
      <div className="elements-list">
        {elementTypes.map((element) => (
          <div
            key={element.id}
            className="element-item"
            draggable
            onDragStart={(e) => handleDragStart(e, element.id)}
          >
            <span className="element-icon">{element.icon}</span>
            <span className="element-label">{element.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
