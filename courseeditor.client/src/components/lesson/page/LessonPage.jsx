import ElementWrapper from "../element/ElementWrapper";
import { useState, useEffect, useCallback } from "react";
import { updateElement } from "../../../api/lessons";
import { useDroppable } from "@dnd-kit/core";
import { editPageTitle } from "../../../api/lessons";
import "../../../styles.css";

function LessonPage({ page }) {
  const [pageTitle, setPageTitle] = useState(page?.title || "");
  const { setNodeRef } = useDroppable({
    id: `page-${page.id}`,
    pageId: page.id,
    data: { type: page.id },
  });
  const handleElementChange = async (elementId, newData) => {
    page.elements.map((el) =>
      el.id === elementId ? { ...el, data: newData } : el,
    );
    try {
      await updateElement(elementId, newData);
    } catch (err) {
      console.error("failed to update element", err);
    }
  };

  const handlePageTitleChange = async (newTitle) => {
    console.log("page id:", pageid, "new title:", newTitle);
    setPageTitle(newTitle);
    try {
      await editPageTitle(page.id, newTitle);
    } catch (err) {
      console.error("failed to edit page title", err);
    }
  };

  return (
    <div className="page-style">
      <div className="page-header">
        <h2
          contentEditable
          aria-readonly="false"
          onBlur={(e) => handlePageTitleChange(e.target.textContent)}
        >
          {pageTitle}
        </h2>
      </div>

      <div ref={setNodeRef} className="elements-container">
        {page.elements.length > 0 ? (
          page.elements.map((el) => (
            <ElementWrapper
              key={el.id}
              element={el}
              onChange={(newData) => handleElementChange(el.id, newData)}
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
    </div>
  );
}
export default LessonPage;
