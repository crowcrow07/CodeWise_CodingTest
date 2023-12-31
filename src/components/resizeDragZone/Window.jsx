import { useState, useEffect } from "react";

import { inRange, registMouseDownDrag } from "../../utils/utils";
import Box from "../../ui/Box";

export default function Window({ data, boundaryRef, clickedDiv, onClick }) {
  const { title = "No Title", location, area, init } = data;
  const { X = 0, Y = 0 } = location;
  const { W = 240, H = 120 } = area;
  const { BOUNDARY_MARGIN = 12, MIN_W = 80, MIN_H = 80 } = init;

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
        x: Math.floor(boundary.width / 2 - DEFAULT_W / 2),
        y: Math.floor(boundary.height / 2 - DEFAULT_H / 2),
        w: DEFAULT_W,
        h: DEFAULT_H,
      });
    }
  }, []);

  return (
    <section
      style={{ width: w, height: h, left: x, top: y }}
      className={`absolute ${clickedDiv === title && "z-10"}`}
      onClick={() => onClick(title)}
    >
      <div className="absolute flex flex-col w-full h-full active:scale-[0.97] active:shadow-lg transition-[shadow,transform] shadow-xl ring-1 ring-gray-100">
        <div
          className="w-full h-[30px] bg-WINDOW_HEADER cursor-move text-white"
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
            () => onClick(title)
          )}
        >
          {title}
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
          () => onClick(title)
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
          () => onClick(title)
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
          () => onClick(title)
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
          () => onClick(title)
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
          () => onClick(title)
        )}
      />
    </section>
  );
}
