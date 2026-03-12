import { useNavigate } from "react-router-dom";

function LessonCard({ lesson }) {
  const navigate = useNavigate();
  const openLessonEditor = () => {
    navigate(`/lesson/${lesson.id}`);
  };
  return (
    <div onClick={openLessonEditor}>
      <div className="lesson-title">{lesson.title}</div>

      <button className="edit-btn">Редактировать</button>
    </div>
  );
}

export default LessonCard;
