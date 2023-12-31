import { useEffect, useRef, useState } from "react";

import Boundary from "./Boundary";
import Window from "./Window";

export default function ResizeDragZone({ data }) {
  const boundaryRef = useRef(null);

  const [clickedDiv, setClickedDiv] = useState(null);

  const handleDivClick = (divId) => {
    setClickedDiv(divId);
  };

  const [Data, setData] = useState(data);

  useEffect(() => {
    const boundary = boundaryRef.current.getBoundingClientRect();

    if (boundary) {
      setData((prevData) => {
        return prevData.map((item) => ({
          ...item,
          boundary: boundary,
        }));
      });
    }
  }, []);

  return (
    <div className="w-screen">
      <Boundary ref={boundaryRef}>
        {Data.map((data) => {
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
