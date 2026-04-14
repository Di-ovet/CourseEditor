import { useState, useCallback, useEffect } from "react";
import "../../styles.css";
import { editLesson } from "../../api/lessons";
import PagesList from "./page/PagesList";
import AddPageButton from "./page/AddPageButton";
import EditableTextBox from "../EditableTextBox";

function MainEditor({ pages, setPages, lesson }) {
  const [title, setTitle] = useState(lesson.title);
  const [loadingPages, setLoadingPages] = useState(false);
  const saveTitle = async () => {
    try {
      await editLesson(lesson.id, title);
      console.log("lesson title updated");
    } catch (err) {
      console.error("failed to edit lesson", err);
      setTitle(lesson.title); // revert
    }
  };
  useEffect(() => {
    setTitle(lesson.title);
  }, [lesson.title]);

  return (
    <div className="lesson-main-editor">
      <EditableTextBox
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onEnter={saveTitle}
        onBlur={saveTitle}
        className="lesson-title-input"
      />

      {loadingPages ? (
        <div style={{ padding: "20px", textAlign: "center", color: "#8a94a6" }}>
          Загрузка страниц...
        </div>
      ) : pages.length > 0 ? (
        <PagesList pages={pages} />
      ) : (
        <div style={{ padding: "20px", textAlign: "center", color: "#8a94a6" }}>
          Нет страниц
        </div>
      )}
      <AddPageButton
        lessonId={lesson.id}
        onPageCreated={(newPage) => setPages((prev) => [...prev, newPage])}
      />
    </div>
  );
}

export default MainEditor;
