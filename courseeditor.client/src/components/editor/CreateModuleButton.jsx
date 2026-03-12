import { createModule } from "../../api/courses";

function CreateModuleButton({ courseId, onCreated }) {
  const handleCreateModule = async () => {
    if (!courseId) return; // nothing we can do without a course

    // compute default order index if caller hasn't provided one
    const newModule = await createModule(courseId);
    if (onCreated) {
      onCreated(newModule);
    }
  };

  return (
    <button className="create-module-btn" onClick={handleCreateModule}>
      + Создать модуль
    </button>
  );
}

export default CreateModuleButton;
