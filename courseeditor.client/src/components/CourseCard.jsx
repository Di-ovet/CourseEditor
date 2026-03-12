import { useNavigate } from "react-router-dom";
import "../styles.css";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const openCourse = (course) => {
    // pass the course object inside the `state` key –
    // React Router v6 expects navigation options like { state, replace }
    navigate(`/course/${course.id}`, { state: { course } });
  };

  return (
    <div className="course-card" onClick={() => openCourse(course)}>
      <h3>{course.title}</h3>
      <p className="course-meta">{course.description}</p>
    </div>
  );
}

export default CourseCard;
