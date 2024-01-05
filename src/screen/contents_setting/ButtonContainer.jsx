import Button from "../../ui/Button";

export default function ButtonContainer({ handleDivClick, handlerSaveButton }) {
  return (
    <div className={`${buttonContainer}`}>
      <Button
        onClick={() => handleDivClick("close", 1)}
        className={`mr-[10px] ${buttonStyle}`}
      >
        창닫기
      </Button>
      <Button
        onClick={handlerSaveButton}
        className={`${buttonStyle} !bg-BLACK text-white active:bg-BLACK`}
      >
        저장
      </Button>
    </div>
  );
}

const buttonContainer = "flex h-[94px] items-center";

const buttonStyle = "!w-[130px] h-[34px] rounded-none";
