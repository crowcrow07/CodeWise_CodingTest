import { useRef } from "react";

import Boundary from "./Boundary";
import Window from "./Window";

export default function ResizeDragZone({
  DATA,
  clickedDiv,
  setClickedDiv,
  handleOpenButton,
  handleCloseButton,
}) {
  const boundaryRef = useRef(null);

  const handleDivClick = (type, divId) => {
    switch (type) {
      case "window":
        setClickedDiv(divId);
        break;
      case "close":
        handleCloseButton(divId);
        break;
      default:
        console.log("error");
    }
  };

  return (
    <div className="w-screen">
      <Boundary ref={boundaryRef}>
        {DATA &&
          boundaryRef &&
          DATA.map((data) => {
            // parameter 값을 변경할때는 신중, setState를 사용했으면 문제가 없었을것이다.
            // data.location = {
            //   X: data.id * 30,
            //   Y: data.id * 30,
            // };
            return (
              <Window
                key={data.id}
                data={data}
                boundaryRef={boundaryRef}
                clickedDiv={clickedDiv}
                handleDivClick={handleDivClick}
                handleOpenButton={handleOpenButton}
              />
            );
          })}
      </Boundary>
    </div>
  );
}
