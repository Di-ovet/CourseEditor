import { useNavigate, Link } from "react-router-dom";
import "../../styles.css";
import SidebarItem from "./element/SidebarItem";

const LeftPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-left-panel">
      <div style={{ padding: "16px" }}>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      <div className="elements-list">
        <h3>Панель элементов</h3>
        <SidebarItem elementType="Text" label="Текст" />
        <SidebarItem elementType="Image" label="Изображение" />
      </div>
    </div>
  );
};

export default LeftPanel;
