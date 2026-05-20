import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function SidebarItem({ elementType, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: `tool-${elementType}`, // MUST be unique
      type: "tool",
      data: {
        type: "tool",
      },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      className="sidebar-item"
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}
export default SidebarItem;
