import IndeterminateCheckbox from "../screen/contents_list/IndeterminateCheckbox";

import { windowImg } from "../assets/images";

export const initData = [
  {
    id: 0,
    contents: null,
    header: {
      title: "컨텐츠 목록",
      icon: windowImg.baseline,
    },
    location: { X: 0, Y: 0 },
    area: { W: 1145, H: 352 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 700, MIN_H: 322 },
  },
];

export const sidebarData = [
  {
    id: 0,
    header: {
      title: "컨텐츠 목록",
      icon: windowImg.baseline,
    },
    contents: null,
    location: { X: 0, Y: 0 },
    area: { W: 1145, H: 352 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 700, MIN_H: 322 },
  },
  {
    id: 1,
    header: {
      title: "컨텐츠 설정",
      icon: null,
    },
    contents: null,
    location: { X: 0, Y: 0 },
    area: { W: 1145, H: 620 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 500, MIN_H: 620 },
  },
];

export const initColumns = [
  {
    id: "select",
    size: 50,
    minSize: 50,
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1 text-center">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  { header: "NO", accessorKey: "mailUid", size: 42, minSize: 42 },
  { header: "메일 유형", accessorKey: "mailType", size: 183, minSize: 163 },
  {
    header: "메일 발송 제목",
    accessorKey: "mailTitle",
    size: 5000,
    minSize: 189,
  },
  {
    header: "메일 사용여부",
    accessorKey: "ismailIUse",
    size: 110,
    minSize: 110,
  },
  {
    header: "수정일",
    accessorKey: "modificationDate",
    size: 167,
    minSize: 157,
  },
];
