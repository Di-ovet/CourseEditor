import LessonList from "./LessonList";
import CreateLessonButton from "./CreateLessonButton";
import EditableTextBox from "../EditableTextBox";
import { getLessons, editModule } from "../../api/courses";
import { useEffect, useState } from "react";

function ModuleCard({ module }) {
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState(module.title);

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
    <div className="module">
      <div className="module-header">
        <EditableTextBox
          text={title}
          onInput={(e) => setTitle(e.target.value)}
          onEnter={saveTitle}
          onBlur={saveTitle}
        />

        <div className="module-tools">Уроки: {lessons.length}</div>
      </div>

      <LessonList lessons={lessons} />

      <CreateLessonButton
        moduleId={module.id}
        onCreated={handleLessonCreated}
      />
    </div>
  );
}

export default ModuleCard;
