import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function LessonCard({ lesson }) {
  const navigate = useNavigate();
  const openLessonEditor = () => {
    navigate(`/lesson/${lesson.id}`, { state: { lesson } });
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className="lesson-item">
      <div
        className="lesson-title"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {lesson.title || "Без названия"}
      </div>

      <button className="edit-btn" onClick={() => openLessonEditor(lesson)}>
        Редактировать
      </button>
    </div>
  );
}

export default LessonCard;
