import ElementRenderer from "./ElementRenderer";
import { useState, useRef, useEffect } from "react";
import "./ElementWrapper.css";

function ElementWrapper({
  element,
  onChange,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onDelete) {
      await onDelete(element.id);
    }
  };

  const handleDuplicate = async (e) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onDuplicate) {
      await onDuplicate(element);
    }
  };

  const handleMoveUp = async (e) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onMoveUp) {
      await onMoveUp(element.id);
    }
  };

  const handleMoveDown = async (e) => {
    e.stopPropagation();
    setShowMenu(false);
    if (onMoveDown) {
      await onMoveDown(element.id);
    }
  };

  return (
    <div className="element-wrapper">
      <div className="element-controls" ref={menuRef}>
        <button className="element-options-btn" onClick={handleMenuClick}>
          ⋮☰
        </button>
        {showMenu && (
          <div className="element-context-menu">
            <button className="menu-item duplicate" onClick={handleDuplicate}>
              Дублировать
            </button>
            <button className="menu-item move-up" onClick={handleMoveUp}>
              поднять
            </button>
            <button className="menu-item move-down" onClick={handleMoveDown}>
              опустить
            </button>
            <button className="menu-item delete" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        )}
      </div>

      <ElementRenderer element={element} onChange={onChange} />
    </div>
  );
}

export default ElementWrapper;
