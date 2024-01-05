import Input from "../../../ui/Input";
import TableHeader from "../TableHeader";

export default function FirstRow({
  contentsData,
  isCheckedValid,
  handleInputChange,
}) {
  return (
    <div className={`${firstRow}`}>
      <div className="flex-[2] flex h-full">
        <TableHeader>메일 유형</TableHeader>
        <div className="flex-[1] flex items-center px-[5px]">
          <Input
            name={"mailType"}
            className={`${contentsData.mailType && "bg-green-100"} ${
              isCheckedValid.mailType && "!bg-red-100"
            }`}
            value={contentsData.mailType}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex-[1] flex h-full">
        <TableHeader>메일 사용여부</TableHeader>
        <div
          className={`flex-[1] flex items-center px-[15px] min-w-[130px] ${
            contentsData.ismailIUse && "bg-green-100"
          } ${isCheckedValid.ismailIUse && "!bg-red-100"}`}
        >
          <label className="flex items-center mr-[10px] cursor-pointer">
            <input
              className="mr-1 cursor-pointer"
              type="radio"
              name="ismailIUse"
              checked={contentsData.ismailIUse === "Y"}
              value="Y"
              onChange={handleInputChange}
            />{" "}
            사용
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              className="mr-1 cursor-pointer"
              type="radio"
              name="ismailIUse"
              checked={contentsData.ismailIUse === "N"}
              value="N"
              onChange={handleInputChange}
            />{" "}
            미사용
          </label>
        </div>
      </div>
    </div>
  );
}

const firstRow =
  "h-[40px] border-b-[1px] border-BORDER border-solid flex items-center";
