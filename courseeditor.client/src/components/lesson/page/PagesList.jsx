import LessonPage from "./LessonPage";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { movePage } from "../../../api/lessons";

function PagesList({ pages, setPages }) {
  // Ensure pages is always an array
  const pagesList = Array.isArray(pages) ? pages : [];

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    console.log("drag end", { active, over });

    if (!over) {
      console.log("No drop target");
      return;
    }

    if (active.id === over.id) return;

    const oldIndex = pagesList.findIndex((p) => p.id === active.id);
    const newIndex = pagesList.findIndex((p) => p.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.log("Index not found", { oldIndex, newIndex });
      return;
    }

    const newPages = arrayMove(pagesList, oldIndex, newIndex);

    setPages(newPages);

    await Promise.all(newPages.map((p, index) => movePage(p.id, index)));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={pagesList.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="page-list">
          {pagesList.map((page) => (
            <LessonPage key={page.id} page={page} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
export default PagesList;
