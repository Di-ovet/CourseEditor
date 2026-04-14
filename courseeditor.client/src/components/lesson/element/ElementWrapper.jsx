import ElementRenderer from "./ElementRenderer";
import { useState } from "react";

import { CSS } from "@dnd-kit/utilities";

function ElementWrapper({ element, onChange }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="element-wrapper">
      <button className="element-options-btn">⋮☰</button>

      <ElementRenderer element={element} onChange={onChange} />
    </div>
  );
}

export default ElementWrapper;
