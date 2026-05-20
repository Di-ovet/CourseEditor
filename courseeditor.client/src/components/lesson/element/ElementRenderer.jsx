import { elementRegistry } from "./ElementRegistry";

function ElementRenderer({ element, onChange }) {
  const Component = elementRegistry[element.elementType];

  if (!Component) {
    return <div>Unknown element type: {element.elementType}</div>;
  }

  // Parse data if it's a JSON string
  let parsedData = element.data;
  if (typeof element.data === "string") {
    try {
      parsedData = JSON.parse(element.data);
    } catch (e) {
      console.error("Failed to parse element data:", e);
      parsedData = {};
    }
  }

  return <Component id={element.id} data={parsedData} onChange={onChange} />;
}
export default ElementRenderer;
