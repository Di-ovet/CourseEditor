import ElementRenderer from "./ElementRenderer";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ElementWrapper({ element, onChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="element-wrapper"
      {...attributes}
    >
      <button
        className="element-options-btn"
        {...listeners}
        title="Drag to reorder or click for options"
      >
        ⋮⋮
      </button>

      <ElementRenderer element={element} onChange={onChange} />
    </div>
  );
}

export default ElementWrapper;
