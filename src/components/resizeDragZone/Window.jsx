import { useState, useEffect } from "react";

import { inRange, registMouseDownDrag } from "../../utils/utils";
import { windowImg } from "../../assets/images";
import Box from "../../ui/Box";

export default function Window({
  data,
  boundaryRef,
  clickedDiv,
  handleDivClick,
}) {
  const { id, header, location, area, init } = data;
  const { title = "No Title", icon } = header;
  const { X = 0, Y = 0 } = location;
  const { W = 500, H = 500 } = area;
  const { BOUNDARY_MARGIN = 12, MIN_W = 500, MIN_H = 500 } = init;

  const [{ x, y, w, h }, setConfig] = useState({
    x: X,
    y: Y,
    w: W,
    h: H,
  });

  useEffect(() => {
    const boundary = boundaryRef.current.getBoundingClientRect();

    if (boundary) {
      const DEFAULT_W = W;
      const DEFAULT_H = H;
      setConfig({
        x: Math.floor(boundary.width / 2 - DEFAULT_W / 2) + X,
        y: Math.floor(boundary.height / 2 - DEFAULT_H / 2) + Y,
        w: DEFAULT_W,
        h: DEFAULT_H,
      });
    }
  }, []);

  return (
    <section
      style={{ width: w, height: h, left: x, top: y }}
      className={`absolute ${clickedDiv === id && "z-10"}`}
      onClick={() => handleDivClick("window", id)}
    >
      <div className={`${windowContainer}`}>
        <div
          className={`${windowHeader} p-2 flex items-center justify-between`}
          {...registMouseDownDrag(
            (deltaX, deltaY) => {
              if (!boundaryRef.current) return;

              const boundary = boundaryRef.current.getBoundingClientRect();

              setConfig({
                x: inRange(
                  x + deltaX,
                  BOUNDARY_MARGIN,
                  boundary.width - w - BOUNDARY_MARGIN
                ),
                y: inRange(
                  y + deltaY,
                  BOUNDARY_MARGIN,
                  boundary.height - h - BOUNDARY_MARGIN
                ),
                w,
                h,
              });
            },
            false,
            () => handleDivClick("window", id)
          )}
        >
          <div className="flex text-xs">
            {icon && <img className="mr-0.5" src={icon} alt="icon" />}
            {title}
          </div>
          <button onClick={() => handleDivClick("close", id)}>
            <img src={windowImg.closeButton} alt="closebutton" />
          </button>
        </div>
        <Box />
      </div>

      {/* 좌하단 */}
      <div
        className="absolute w-4 h-4 -bottom-1 -left-1 cursor-ne-resize"
        {...registMouseDownDrag(
          (deltaX, deltaY) => {
            if (!boundaryRef.current) return;

            const boundary = boundaryRef.current.getBoundingClientRect();

            setConfig({
              x: inRange(x + deltaX, BOUNDARY_MARGIN, x + w - MIN_W),
              y,
              w: inRange(w - deltaX, MIN_W, x + w - BOUNDARY_MARGIN),
              h: inRange(
                h + deltaY,
                MIN_H,
                boundary.height - y - BOUNDARY_MARGIN
              ),
            });
          },
          true,
          () => handleDivClick("window", id)
        )}
      />
      {/* 우하단 */}
      <div
        className="absolute w-4 h-4 -bottom-1 -right-1 cursor-se-resize"
        {...registMouseDownDrag(
          (deltaX, deltaY) => {
            if (!boundaryRef.current) return;

            const boundary = boundaryRef.current.getBoundingClientRect();

            setConfig({
              x,
              y,
              w: inRange(
                w + deltaX,
                MIN_W,
                boundary.width - x - BOUNDARY_MARGIN
              ),
              h: inRange(
                h + deltaY,
                MIN_H,
                boundary.height - y - BOUNDARY_MARGIN
              ),
            });
          },
          true,
          () => handleDivClick("window", id)
        )}
      />

      {/* 하단 */}
      <div
        className="absolute -bottom-0.5 left-3 right-3 h-2 cursor-s-resize"
        {...registMouseDownDrag(
          (_, deltaY) => {
            if (!boundaryRef.current) return;

            const boundary = boundaryRef.current.getBoundingClientRect();

            setConfig({
              x,
              y,
              w,
              h: inRange(
                h + deltaY,
                MIN_H,
                boundary.height - y - BOUNDARY_MARGIN
              ),
            });
          },
          true,
          () => handleDivClick("window", id)
        )}
      />
      {/* 우측 */}
      <div
        className="absolute bottom-3 top-3 -right-0.5 w-2 cursor-e-resize"
        {...registMouseDownDrag(
          (deltaX) => {
            if (!boundaryRef.current) return;

            const boundary = boundaryRef.current.getBoundingClientRect();

            setConfig({
              x,
              y,
              w: inRange(
                w + deltaX,
                MIN_W,
                boundary.width - x - BOUNDARY_MARGIN
              ),
              h,
            });
          },
          true,
          () => handleDivClick("window", id)
        )}
      />
      {/* 좌측 */}
      <div
        className="absolute bottom-3 top-3 -left-0.5 w-2 cursor-w-resize"
        {...registMouseDownDrag(
          (deltaX) => {
            setConfig({
              x: inRange(x + deltaX, BOUNDARY_MARGIN, x + w - MIN_W),
              y,
              w: inRange(w - deltaX, MIN_W, x + w - BOUNDARY_MARGIN),
              h,
            });
          },
          true,
          () => handleDivClick("window", id)
        )}
      />
    </section>
  );
}

const windowContainer =
  "absolute flex flex-col w-full h-full active:shadow-lg transition-[shadow,transform] shadow-xl ring-1 ring-gray-100";

const windowHeader = "w-full h-[30px] bg-WINDOW_HEADER cursor-move text-white";

// active:scale-[0.97]
