import { createLesson } from "../../api/courses";
import { useState } from "react";

function CreateLessonButton({ moduleId, onCreated }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!moduleId || loading) return;
    setLoading(true);
    try {
      const lesson = await createLesson(moduleId);
      if (onCreated) onCreated(lesson);
    } catch (err) {
      console.error("failed to create lesson", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="create-lesson-btn"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Создание…" : "+ Добавить урок"}
    </button>
  );
}

export default CreateLessonButton;
