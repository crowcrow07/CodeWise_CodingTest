import Button from "../../../ui/Button";
import { windowImg } from "../../../assets/images";

export default function FifthRow({ handleOpenModal, convertedContent }) {
  return (
    <div className={`${fifthRow}`}>
      <Button
        onClick={() => handleOpenModal(convertedContent)}
        className={`!w-[100px] h-[26px] mr-[5px]`}
      >
        <img className="mr-[2px]" alt="logo" src={windowImg.preView} />
        미리보기
      </Button>
    </div>
  );
}

const fifthRow = "h-[40px] flex items-center justify-end bg-INPUT";
