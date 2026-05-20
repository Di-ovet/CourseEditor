import ModuleCard from "./ModuleCard";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { moveModule } from "../../api/courses";

function ModuleList({ modules, setModules }) {
  // Ensure modules is always an array
  const modulesList = Array.isArray(modules) ? modules : [];

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    console.log("drag end", { active, over });

    if (!over) {
      console.log("No drop target");
      return;
    }

    if (active.id === over.id) return;

    const oldIndex = modulesList.findIndex((m) => m.id === active.id);
    const newIndex = modulesList.findIndex((m) => m.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.log("Index not found", { oldIndex, newIndex });
      return;
    }

    const newModules = arrayMove(modulesList, oldIndex, newIndex);

    setModules(newModules);

    await Promise.all(newModules.map((m, index) => moveModule(m.id, index)));
  };

  const handleDeleteModule = (moduleId) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={modulesList.map((m) => m.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="module-list">
          {modulesList.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onDelete={handleDeleteModule}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
export default ModuleList;
