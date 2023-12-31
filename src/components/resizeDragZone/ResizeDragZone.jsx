import { useRef, useState } from "react";

import Boundary from "./Boundary";
import Window from "./Window";

export default function ResizeDragZone({ DATA }) {
  const boundaryRef = useRef(null);

  const [clickedDiv, setClickedDiv] = useState(null);

  const handleDivClick = (divId) => {
    setClickedDiv(divId);
  };

  return (
    <div className="w-screen">
      <Boundary ref={boundaryRef}>
        {DATA.map((data) => {
          return (
            <Window
              key={data.id}
              data={data}
              boundaryRef={boundaryRef}
              clickedDiv={clickedDiv}
              onClick={handleDivClick}
            />
          );
        })}
      </Boundary>
    </div>
  );
}
