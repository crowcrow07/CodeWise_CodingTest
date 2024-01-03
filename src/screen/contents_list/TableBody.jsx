import React, { useRef } from "react";
import { flexRender } from "@tanstack/react-table";

import { useVirtualizer } from "@tanstack/react-virtual";

export default function TableBody({ rows }) {
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
                className={`flex absolute w-full ${
                  isSelected ? "bg-SELECT_HIGHLIGHT" : "bg-white"
                }`}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={`${td}`}
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

const td = "flex items-center justify-center px-[2px] py-4 text-center";
