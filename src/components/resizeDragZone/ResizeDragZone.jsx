import { useRef } from "react";

import Boundary from "./Boundary";
import Window from "./Window";

export default function ResizeDragZone({
  DATA,
  clickedDiv,
  setClickedDiv,
  handleOpenButton,
  handleOpenModal,
  handleCloseButton,
}) {
  const boundaryRef = useRef(null);

  const handleDivClick = (type, divId) => {
    switch (type) {
      case "window":
        setClickedDiv(divId);
        break;
      case "close":
        handleCloseButton(type, divId);
        break;
      case "save":
        handleCloseButton(type, divId);
        break;
      default:
    }
  };

  return (
    <div className="w-screen z-[1]">
      <Boundary ref={boundaryRef}>
        {DATA &&
          boundaryRef &&
          DATA.map((data) => {
            return (
              <Window
                key={data.id}
                data={data}
                boundaryRef={boundaryRef}
                clickedDiv={clickedDiv}
                handleDivClick={handleDivClick}
                handleOpenButton={handleOpenButton}
                handleOpenModal={handleOpenModal}
              />
            );
          })}
      </Boundary>
    </div>
  );
}
