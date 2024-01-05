import DOMPurify from "dompurify";

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

// XSS 공격 대비
export function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

// <p></p>, \n -> <br/>
export function replaceEmptyPAndNewlines(mailContent) {
  const withoutEmptyP = mailContent.replace(/<p><\/p>/gi, "<br/>");
  const withoutNewlines = withoutEmptyP.replace(/\n/g, "<br/>");

  return withoutNewlines;
}

export function createDataArrayBatch(dataList) {
  let dataArray = [];
  const resultArray = [];

  for (const data of dataList) {
    Object.keys(data).forEach((key, idx) => {
      dataArray.push({
        v: data[key],
        t: typeof data[key] === "string" ? "s" : "n",
      });
      if (idx === 6) {
        resultArray.push(dataArray);
        dataArray = [];
      }
    });
  }

  return resultArray;
}
