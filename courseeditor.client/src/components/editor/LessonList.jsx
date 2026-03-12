import LessonCard from "./LessonCard";

function LessonList({ lessons }) {
  return (
    <div className="lesson-list">
      {lessons.map((l) => (
        <LessonCard key={l.id} lesson={l} />
      ))}
    </div>
  );
}

export default LessonList;
