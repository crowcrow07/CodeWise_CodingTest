import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteData } from "../../api/deleteData";

import Button from "../../ui/Button";

export default function ContentListHeader({ table, dataQuery, rowSelection }) {
  const queryClient = useQueryClient();

  const deleteDataQuery = useMutation({
    mutationFn: (id) =>
      deleteData({
        mailUidList: id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("queryKey");
    },
    onError: () => {
      console.error("에러 발생");
    },
  });

  const getSelectedRowModelHandler =
    table.getSelectedRowModel().rows.length !== 0 &&
    table.getSelectedRowModel().rows.map((v) => v.original.mailUid);

  const uniqueMailTypes = new Set(
    dataQuery.data?.totalData.map((v) => v.mailType)
  );
  const uniqueMailTypesCount = uniqueMailTypes.size;

  return (
    <div className={`${contentListHeader}`}>
      <div className="flex items-center">
        <div className={`${mailCounter}`}>
          전체 등록 : {uniqueMailTypesCount}
        </div>
        <div>등록된 전체 메일 유형입니다.</div>
      </div>
      <div className="flex">
        <Button className={"mr-[7px]"}>등록</Button>
        <Button
          disabled={!Object.keys(rowSelection).length}
          onClick={() => deleteDataQuery.mutate(getSelectedRowModelHandler)}
        >
          삭제
        </Button>
      </div>
    </div>
  );
}

const contentListHeader =
  "flex text-xs font-bold items-center justify-between p-[15px] h-[40px] border-b-[1px] border-solid border-BORDER";

const mailCounter =
  "mr-[10px] flex px-[5px] py-[3px] justify-center items-center bg-MAIL_COUNTER text-MAIL_COUNTER_FONT rounded-[5px]";
