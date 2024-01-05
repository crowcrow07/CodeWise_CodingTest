import TableHeader from "../TableHeader";
import Input from "../../../ui/Input";

export default function FourthRow({
  contentsData,
  isCheckedValid,
  handleInputChange,
}) {
  return (
    <div className={`${fourthRow}`}>
      <TableHeader>변경 사유</TableHeader>
      <div className="flex-[1] flex items-center px-[5px]">
        <Input
          name={"reason"}
          className={`${contentsData.reason && "bg-green-100"} ${
            isCheckedValid.reason && "!bg-red-100"
          } bg-INPUT border-BORDER border-[1px]`}
          value={contentsData.reason}
          onChange={handleInputChange}
          placeholder={"argument 변경시 에러가 발생하오니 주의하시기 바랍니다."}
        />
      </div>
    </div>
  );
}

const fourthRow = "h-[40px] flex border-b-[1px] border-BORDER border-solid";
