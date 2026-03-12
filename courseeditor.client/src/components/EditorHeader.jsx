import "../styles.css";

function EditorHeader({ onSave, onRun }) {
  return (
    <div className="editor-header">
      <div className="editor-header-left">
        <button className="back-button">← Назад</button>
      </div>

      <div className="editor-header-center">
        <span className="editor-title">Редактор курса</span>
      </div>

      <div className="editor-header-right">
        {/* save button supplied by parent */}
        {onSave && (
          <button className="header-btn" onClick={onSave}>
            Сохранить
          </button>
        )}
        {/* run button optionally customizable */}
        <button className="header-btn primary" onClick={onRun}>
          Запустить курс
        </button>
      </div>
    </div>
  );
}

export default EditorHeader;
