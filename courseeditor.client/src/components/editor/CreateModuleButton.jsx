import { createModule } from "../../api/courses";

function CreateModuleButton({ courseId, onCreated, moduleCount = 0 }) {
  const handleCreateModule = async () => {
    if (!courseId) return; // nothing we can do without a course

    try {
      await createModule(courseId, moduleCount);
      if (onCreated) {
        onCreated(); // refetch modules
      }
    } catch (err) {
      console.error("failed to create module", err);
    }
  };

  return (
    <button className="create-module-btn" onClick={handleCreateModule}>
      + Создать модуль
    </button>
  );
}

export default CreateModuleButton;
