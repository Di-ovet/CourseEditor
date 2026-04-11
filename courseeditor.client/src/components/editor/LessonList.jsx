import LessonCard from "./LessonCard";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { moveLesson } from "../../api/courses";

function LessonList({ lessons, setLessons }) {
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    console.log("drag end", { active, over });

    if (!over) {
      console.log("No drop target");
      return;
    }

    if (active.id === over.id) return;

    const oldIndex = lessons.findIndex((l) => l.id === active.id);
    const newIndex = lessons.findIndex((l) => l.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.log("Index not found", { oldIndex, newIndex });
      return;
    }

    const newLessons = arrayMove(lessons, oldIndex, newIndex);

    setLessons(newLessons);

    await Promise.all(newLessons.map((l, index) => moveLesson(l.id, index)));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={lessons} strategy={horizontalListSortingStrategy}>
        <div className="lesson-list">
          {lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default LessonList;
