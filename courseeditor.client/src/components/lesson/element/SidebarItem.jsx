import { useDraggable } from "@dnd-kit/core";

function SidebarItem({ elementType, label }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `tool-${elementType}`, // MUST be unique
    data: {
      type: "tool",
      elementType: elementType,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="sidebar-item"
    >
      {label}
    </div>
  );
}
export default SidebarItem;
