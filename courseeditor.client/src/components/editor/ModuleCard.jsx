import LessonList from "./LessonList";
import CreateLessonButton from "./CreateLessonButton";
import EditableTextBox from "../EditableTextBox";
import { getLessons, editModule } from "../../api/courses";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ModuleCard({ module }) {
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

  return (
    <div ref={setNodeRef} style={style} className="module-card">
      <div className="module-header">
        <EditableTextBox
          text={title}
          className="module-title-input"
          onInput={(e) => setTitle(e.target.value)}
          onEnter={saveTitle}
          onBlur={saveTitle}
        />

        <div className="module-tools">Уроки: {lessons.length}</div>
      </div>
      <div className="drag-handle" {...attributes} {...listeners}>
        ⋮⋮
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
