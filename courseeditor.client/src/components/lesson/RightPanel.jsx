import React from "react";
import "../../styles.css";

function RightPanel({ lesson, onAction }) {
  const handleAction = (action) => {
    if (onAction) {
      onAction(action);
    }
  };

  return (
    <div className="lesson-right-panel">
      <div className="right-panel-header">
        <h3>Lesson Actions</h3>
      </div>

      <div className="actions-list">
        <button className="action-btn" onClick={() => handleAction("preview")}>
          👁️ Preview
        </button>

        <button className="action-btn" onClick={() => handleAction("publish")}>
          📤 Publish
        </button>

        <button
          className="action-btn"
          onClick={() => handleAction("duplicate")}
        >
          📋 Duplicate
        </button>

        <button className="action-btn" onClick={() => handleAction("moveUp")}>
          ⬆️ Move Up
        </button>

        <button className="action-btn" onClick={() => handleAction("moveDown")}>
          ⬇️ Move Down
        </button>

        <button
          className="action-btn warning"
          onClick={() => handleAction("delete")}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
export default RightPanel;
