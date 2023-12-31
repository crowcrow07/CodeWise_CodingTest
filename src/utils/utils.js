// 범위를 얻는 유틸함수
export const inRange = (v, min, max) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

// 마우스 드래그 유틸함수
export const registMouseDownDrag = (onDragChange, stopPropagation, zIndex) => {
  return {
    onMouseDown: (clickEvent) => {
      if (stopPropagation) clickEvent.stopPropagation();
      if (zIndex !== undefined) zIndex();

      const mouseMoveHandler = (moveEvent) => {
        const deltaX = moveEvent.screenX - clickEvent.screenX;
        const deltaY = moveEvent.screenY - clickEvent.screenY;
        onDragChange(deltaX, deltaY);
      };

      const mouseUpHandler = () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler, { once: true });
    },
  };
};
