import LessonList from "./LessonList";
import CreateLessonButton from "./CreateLessonButton";
import EditableTextBox from "../EditableTextBox";
import { getLessons } from "../../api/courses";
import { useEffect, useState } from "react";

function ModuleCard({ module }) {
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    async function fetchLessons() {
      const data = await getLessons(module.id);
      console.log("lessons:", data);
      setLessons(data ?? []);
    }

    fetchLessons();
  }, [module.id]);

  return (
    <div className="module">
      <div className="module-header">
        <EditableTextBox text={module.title} />

        <div className="module-tools">уроки: {lessons.length}</div>
      </div>

      <LessonList lessons={lessons} />

      <CreateLessonButton />
    </div>
  );
}

export default ModuleCard;
