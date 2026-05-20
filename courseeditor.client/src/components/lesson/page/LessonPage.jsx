import ElementWrapper from "../element/ElementWrapper";
import { useState, useEffect, useCallback } from "react";
import {
  updateElement,
  deleteElement,
  addElement,
  moveElement,
} from "../../../api/lessons";
import { useDroppable } from "@dnd-kit/core";
import { editPageTitle } from "../../../api/lessons";
import "../../../styles.css";
import { DragDropProvider } from "@dnd-kit/react";

function LessonPage({ page }) {
  const [pageTitle, setPageTitle] = useState(page?.title || "");
  const [elements, setElements] = useState(page?.elements || []);

  useEffect(() => {
    setElements(page?.elements || []);
  }, [page]);

  const { setNodeRef, isOver } = useDroppable({
    id: `page-${page.id}`,
    data: {
      type: "page",
    },
  });
  const handleElementChange = async (elementId, newData) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === elementId ? { ...el, data: newData } : el,
      ),
    );
    try {
      const element = elements.find((el) => el.id === elementId);
      await updateElement(elementId, element.type, newData);
    } catch (err) {
      console.error("failed to update element", err);
    }
  };

  const handlePageTitleChange = async (newTitle) => {
    setPageTitle(newTitle);
    try {
      await editPageTitle(page.id, newTitle);
    } catch (err) {
      console.error("failed to edit page title", err);
      setPageTitle(page.title);
    }
  };

  const handlePageTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePageTitleChange(e.currentTarget.textContent);
    }
  };

  const handleDeleteElement = async (elementId) => {
    try {
      await deleteElement(elementId);
      setElements((prevElements) =>
        prevElements.filter((el) => el.id !== elementId),
      );
    } catch (err) {
      console.error("failed to delete element", err);
    }
  };

  const handleDuplicateElement = async (element) => {
    try {
      const newElement = {
        pageId: page.id,
        type: element.elementType || element.type,
        data:
          typeof element.data === "string"
            ? JSON.parse(element.data)
            : element.data,
        order: elements.length,
      };
      const newId = await addElement(
        page.id,
        newElement.type,
        newElement.data,
        newElement.order,
      );
      setElements((prevElements) => [
        ...prevElements,
        {
          id: newId,
          elementType: newElement.type,
          data: newElement.data,
          orderIndex: newElement.order,
        },
      ]);
    } catch (err) {
      console.error("failed to duplicate element", err);
    }
  };

  const handleMoveElementUp = async (elementId) => {
    const elementIndex = elements.findIndex((el) => el.id === elementId);
    if (elementIndex <= 0) return; // Can't move first element up

    const newElements = [...elements];
    [newElements[elementIndex - 1], newElements[elementIndex]] = [
      newElements[elementIndex],
      newElements[elementIndex - 1],
    ];

    setElements(newElements);

    try {
      await Promise.all([
        moveElement(newElements[elementIndex - 1].id, elementIndex - 1),
        moveElement(newElements[elementIndex].id, elementIndex),
      ]);
    } catch (err) {
      console.error("failed to move element", err);
      setElements(elements); // revert
    }
  };

  const handleMoveElementDown = async (elementId) => {
    const elementIndex = elements.findIndex((el) => el.id === elementId);
    if (elementIndex >= elements.length - 1) return; // Can't move last element down

    const newElements = [...elements];
    [newElements[elementIndex], newElements[elementIndex + 1]] = [
      newElements[elementIndex + 1],
      newElements[elementIndex],
    ];

    setElements(newElements);

    try {
      await Promise.all([
        moveElement(newElements[elementIndex].id, elementIndex),
        moveElement(newElements[elementIndex + 1].id, elementIndex + 1),
      ]);
    } catch (err) {
      console.error("failed to move element", err);
      setElements(elements); // revert
    }
  };

  return (
    <div className="page-style">
      <div className="page-header">
        <h2
          contentEditable={true}
          onBlur={(e) => handlePageTitleChange(e.currentTarget.textContent)}
          onKeyDown={handlePageTitleKeyDown}
          className="page-title"
          style={{ direction: "ltr" }}
        >
          {pageTitle}
        </h2>
      </div>
      <DragDropProvider>
        <div
          style={{ padding: "15px" }}
          ref={setNodeRef}
          className={`elements-container ${isOver ? "drop-active" : ""}`}
        >
          {elements.length > 0 ? (
            elements.map((el) => (
              <ElementWrapper
                key={el.id}
                element={el}
                onChange={(newData) => handleElementChange(el.id, newData)}
                onDelete={handleDeleteElement}
                onDuplicate={handleDuplicateElement}
                onMoveUp={handleMoveElementUp}
                onMoveDown={handleMoveElementDown}
              />
            ))
          ) : (
            <div
              style={{
                padding: "20px",
                color: "#8a94a6",
                textAlign: "center",
              }}
            >
              Нет элементов
            </div>
          )}
        </div>
      </DragDropProvider>
    </div>
  );
}
export default LessonPage;
