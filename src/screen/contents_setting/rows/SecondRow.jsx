import TableHeader from "../TableHeader";
import Input from "../../../ui/Input";

export default function SecondRow({
  contentsData,
  isCheckedValid,
  handleInputChange,
}) {
  return (
    <div className={`${secondRow}`}>
      <TableHeader>메일 발송 제목</TableHeader>
      <div className="flex-[1] flex items-center px-[5px]">
        <Input
          name={"mailTitle"}
          className={`${contentsData.mailTitle && "bg-green-100"} ${
            isCheckedValid.mailTitle && "!bg-red-100"
          } bg-INPUT border-BORDER border-[1px]`}
          value={contentsData.mailTitle}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

const secondRow =
  "h-[40px] w-full flex border-b-[1px] border-BORDER border-solid";
