import ModuleCard from "./ModuleCard";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { moveModule } from "../../api/courses";

function ModuleList({ modules, setModules }) {
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    console.log("drag end", { active, over });

    if (!over) {
      console.log("No drop target");
      return;
    }

    if (active.id === over.id) return;

    const oldIndex = modules.findIndex((m) => m.id === active.id);
    const newIndex = modules.findIndex((m) => m.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.log("Index not found", { oldIndex, newIndex });
      return;
    }

    const newModules = arrayMove(modules, oldIndex, newIndex);

    setModules(newModules);

    await Promise.all(newModules.map((m, index) => moveModule(m.id, index)));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={modules.map((m) => m.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="module-list">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
export default ModuleList;
