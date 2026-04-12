import ElementWrapper from "./ElementWrapper";
import { useState, useEffect, useCallback } from "react";
import { getElements, updateElement, moveElement } from "../../../api/lessons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

function LessonPage({ page }) {
  const [elements, setElements] = useState([]);
  const [pageTitle, setPageTitle] = useState(page?.title || "");

  const fetchElements = useCallback(async () => {
    if (!page?.id) return;
    try {
      const data = await getElements(page.id);
      console.log("elements:", data);
      setElements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("failed to fetch elements", err);
      setElements([]);
    }
  }, [page?.id]);

  useEffect(() => {
    fetchElements();
  }, [fetchElements]);

  const handleElementChange = async (elementId, newData) => {
    setElements((prev) =>
      prev.map((el) => (el.id === elementId ? { ...el, data: newData } : el)),
    );

    try {
      await updateElement(elementId, newData);
    } catch (err) {
      console.error("failed to update element", err);
    }
  };

  const handlePageTitleChange = (newTitle) => {
    setPageTitle(newTitle);
    // TODO: Save to server
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = elements.findIndex((e) => e.id === active.id);
    const newIndex = elements.findIndex((e) => e.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newElements = arrayMove(elements, oldIndex, newIndex);
    setElements(newElements);

    await Promise.all(newElements.map((e, index) => moveElement(e.id, index)));
  };

  return (
    <div className="page-style">
      <div className="page-header">
        <h2 onDoubleClick={() => {}}>{pageTitle}</h2>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={elements.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          {elements.length > 0 ? (
            elements.map((el) => (
              <ElementWrapper
                key={el.id}
                element={el}
                onChange={(newData) => handleElementChange(el.id, newData)}
              />
            ))
          ) : (
            <div
              style={{ padding: "20px", color: "#8a94a6", textAlign: "center" }}
            >
              Нет элементов
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
}
export default LessonPage;
