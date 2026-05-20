import LessonList from "./LessonList";
import CreateLessonButton from "./CreateLessonButton";
import EditableTextBox from "../EditableTextBox";
import { getLessons, editModule, deleteModule } from "../../api/courses";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ModuleCard({ module, onDelete }) {
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState(module.title);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: module.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    async function fetchLessons() {
      const data = await getLessons(module.id);
      console.log("lessons:", data);
      setLessons(data ?? []);
    }

    fetchLessons();
  }, [module.id]);

  const saveTitle = async () => {
    try {
      await editModule(module.id, title);
      console.log("module title updated");
    } catch (err) {
      console.error("failed to edit module", err);
      setTitle(module.title); // revert
    }
  };

  const handleLessonCreated = (newLesson) => {
    setLessons((prev) => [...prev, newLesson]);
  };

  const handleDeleteModule = async () => {
    if (window.confirm(`Удалить модуль "${title}"?`)) {
      try {
        await deleteModule(module.id);
        if (onDelete) {
          onDelete(module.id);
        }
      } catch (err) {
        console.error("failed to delete module", err);
      }
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="module-card">
      <div className="module-header">
        <div className="module-title-section">
          <EditableTextBox
            text={title}
            className="module-title-input"
            onInput={(e) => setTitle(e.target.value)}
            onEnter={saveTitle}
            onBlur={saveTitle}
          />
        </div>

        <div className="module-controls-row">
          <div
            className="drag-handle"
            {...attributes}
            {...listeners}
            title="Перетащите для перемещения"
          >
            ⋮⋮
          </div>
          <span className="lesson-count">Уроки: {lessons.length}</span>
          <button
            className="delete-module-btn"
            onClick={handleDeleteModule}
            title="Удалить модуль"
          >
            ✕
          </button>
        </div>
      </div>

      <LessonList lessons={lessons} setLessons={setLessons} />

      <CreateLessonButton
        moduleId={module.id}
        onCreated={handleLessonCreated}
      />
    </div>
  );
}

export default ModuleCard;
