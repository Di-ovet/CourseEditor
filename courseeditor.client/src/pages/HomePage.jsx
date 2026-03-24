import { useEffect, useState } from "react";
import { getCourses } from "../api/courses";
import CourseCard from "../components/CourseCard";
import CreateCourseButton from "../components/CreateCourseButton";
import TopBar from "../components/TopBar";
import "../styles.css";

function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const data = await getCourses();
      console.log("courses:", data);
      setCourses(data ?? []);
    }

    fetchCourses();
  }, []);

  const handleCourseCreated = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  return (
    <div className="home-header">
      <TopBar />
      <div className="home">
        <div className="course-grid">
          {(courses ?? []).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
        <CreateCourseButton onCreated={handleCourseCreated} />
      </div>
    </div>
  );
}

export default HomePage;
