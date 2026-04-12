import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import "../../styles.css";
import { getPages, editLesson } from "../../api/lessons";
import PagesList from "./page/PagesList";
import AddPageButton from "./page/AddPageButton";
import EditableTextBox from "../EditableTextBox";

function MainEditor({ lesson }) {
  const [title, setTitle] = useState(lesson.title);
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  const fetchPages = useCallback(async () => {
    if (!lesson?.id) {
      setLoadingPages(false);
      return;
    }
    try {
      const data = await getPages(lesson.id);
      console.log("pages:", data);
      // Ensure data is always an array
      setPages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("failed to fetch pages", err);
      setPages([]);
    } finally {
      setLoadingPages(false);
    }
  }, [lesson?.id]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    setTitle(lesson.title);
  }, [lesson.title]);

  const saveTitle = async () => {
    try {
      await editLesson(lesson.id, title);
      console.log("lesson title updated");
    } catch (err) {
      console.error("failed to edit lesson", err);
      setTitle(lesson.title); // revert
    }
  };

  return (
    <div className="lesson-editor-main">
      <div className="lesson-title-section">
        <EditableTextBox
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onEnter={saveTitle}
          onBlur={saveTitle}
          className="lesson-title-input"
        />
      </div>

      {loadingPages ? (
        <div style={{ padding: "20px", textAlign: "center", color: "#8a94a6" }}>
          Загрузка страниц...
        </div>
      ) : pages.length > 0 ? (
        <PagesList pages={pages} setPages={setPages} />
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
