import React, { useRef } from "react";
import { flexRender } from "@tanstack/react-table";

import { useVirtualizer } from "@tanstack/react-virtual";

export default function TableBody({ rows, handleOpenButton }) {
  const tableContainerRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 10,
    getScrollElement: () => tableContainerRef.current,

    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const contentSetting = {
    id: 1,
    contents: null,
    header: {
      title: "컨텐츠 설정",
      icon: null,
    },
    location: { X: 0, Y: 0 },
    area: { W: 1145, H: 620 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 500, MIN_H: 620 },
  };

  const containsSelect = (inputString) => {
    const lowerCaseInput = inputString.toLowerCase();
    const isSelectPresent = lowerCaseInput.includes("select");
    return !isSelectPresent;
  };

  const handlerRowClick = (contents, isCheckbox) => {
    if (!isCheckbox) return;
    handleOpenButton({ ...contentSetting, contents: contents });
  };

  return (
    <div ref={tableContainerRef} className={`${tableBodyContainer}`}>
      <table className="relative w-full h-full">
        <tbody className="w-full h-full">
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            const isSelected = row.getIsSelected();

            return (
              <tr
                data-index={virtualRow.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                key={row.id}
                className={`flex absolute w-full cursor-pointer border-b-[1px] border-BORDER ${
                  isSelected ? "bg-SELECT_HIGHLIGHT" : "bg-white"
                }`}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                // onClick={() => {
                //   console.log("클릭됨", row.original);
                //   handlerRowClick(row.original);
                // }}
              >
                {row.getVisibleCells().map((cell) => {
                  // console.log(containsSelect(cell.id));
                  return (
                    <td
                      key={cell.id}
                      className={`${td}`}
                      onClick={() =>
                        handlerRowClick(row.original, containsSelect(cell.id))
                      }
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const tableBodyContainer =
  "relative w-full h-full overflow-x-hidden overflow-y-scroll";

const td = "flex items-center justify-center px-[2px] py-2 text-center";
