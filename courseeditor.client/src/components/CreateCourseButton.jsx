import { createCourse } from "../api/courses";

function CreateCourseButton({ onCreated }) {
  const handleCreate = async () => {
    const course = await createCourse();

    if (onCreated) {
      onCreated(course);
    }
  };

  return (
    <button className="create-course-btn" onClick={handleCreate}>
      +
    </button>
  );
}

export default CreateCourseButton;
