import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

import ContentListHeader from "./ContentListHeader";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

import { fetchData } from "../../api/fetchData";
import { initColumns } from "../../utils/data";

export default function ContentList({ id, handleOpenButton, handleDivClick }) {
  const columns = useMemo(() => initColumns, []);

  const [rowSelection, setRowSelection] = useState({});
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const dataQuery = useQuery({
    queryKey: ["data", fetchDataOptions],
    queryFn: () => {
      setRowSelection({});
      return fetchData(fetchDataOptions);
    },
    keepPreviousData: true,
  });
  if (dataQuery.data?.rows?.length === 0) {
    const updatedPageIndex = Math.max(0, pageIndex - 1);
    setPagination({
      pageIndex: updatedPageIndex,
      pageSize,
    });
  }

  const defaultData = [];

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: false,
  });

  const totalData = dataQuery.data?.totalData ?? -1;

  const { rows } = table.getRowModel();

  return (
    <div className={`${contentListContainer} `}>
      <ContentListHeader
        table={table}
        dataQuery={dataQuery}
        rowSelection={rowSelection}
        handleOpenButton={handleOpenButton}
        handleDivClick={handleDivClick}
      />
      <div
        onClick={() => handleDivClick("window", id)}
        className={`${tableContainer}`}
      >
        <TableHeader table={table} />
        <div className={`${tableSection}`}>
          {!dataQuery.isFetching ? (
            <TableBody
              rows={rows}
              table={table}
              handleOpenButton={handleOpenButton}
            />
          ) : (
            <div className={`${loaderContainer}`}>
              <span className="loader"></span>
            </div>
          )}
        </div>
        <div className={`${tableFooter}`}>
          <div className="flex justify-start flex-1 px-2">액셀 저장</div>
          <div className="flex flex-[3] justify-center gap-2 bg-white">
            <button
              className="p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>

            <span className="flex items-center gap-1">
              <div>페이지</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} /{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="w-16 p-1 border rounded"
              />
            </span>
            <button
              className="p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end flex-1 px-2">
            {" "}
            보기{" "}
            {totalData.length > 0
              ? table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                1
              : 0}{" "}
            -{" "}
            {totalData.length > 0
              ? Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  totalData.length
                )
              : 0}{" "}
            / {totalData.length}
          </div>
        </div>
      </div>
    </div>
  );
}

const contentListContainer = "flex flex-col w-full h-full relative";

const tableContainer =
  "absolute flex w-full flex-col bottom-0 h-[calc(100%-40px)]";

const tableSection = "flex w-full h-full";

const loaderContainer = "flex items-center justify-center w-full h-full";

const tableFooter =
  "flex w-full items-center border-t-[1px] border-solid border-BORDER";
