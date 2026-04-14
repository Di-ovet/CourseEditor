import { elementRegistry } from "./ElementRegistry";

function ElementRenderer({ element, onChange }) {
  const Component = elementRegistry[element.elementType];

  if (!Component) {
    return <div>Unknown element type: {element.elementType}</div>;
  }

  return <Component id={element.id} data={element.data} onChange={onChange} />;
}
export default ElementRenderer;
