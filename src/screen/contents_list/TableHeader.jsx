import { flexRender } from "@tanstack/react-table";

export default function TableHeader({ table }) {
  return (
    <thead className={`${tableHeader}`}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr className="flex items-center w-full" key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const isModificationDate = header.id !== "modificationDate";
            return (
              <th
                style={{
                  width: header.getSize(),
                  minWidth: header.column.columnDef.minSize,
                }}
                className={`${th} ${isModificationDate && borderRight}`}
                key={header.id}
              >
                {header.isPlaceholder ? null : (
                  <div className="px-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

const tableHeader = "w-full border-b-[1px] border-solid border-BORDER py-2";

const th = "flex justify-center text-center bg-white";

const borderRight = "border-r-[1px] border-solid border-WINDOW_HEADER";
