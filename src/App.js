import { useState } from "react";

import Sidebar from "./components/sidebar/Sidebar";
import ResizeDragZone from "./components/resizeDragZone/ResizeDragZone";

import { initData } from "./utils/data";
import { createMarkup } from "./utils/utils";
import Button from "./ui/Button";

function App() {
  const [data, setData] = useState(initData);
  const [clickedDiv, setClickedDiv] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState(null);

  const handleOpenButton = (payload) => {
    const isIdExist = data.some((item) => item.id === payload.id);

    // console.log(payload.contents);

    if (!isIdExist) {
      setData((prev) => [...prev, payload]);
    }
    setClickedDiv(payload.id);
  };

  const handleCloseButton = (type, id) => {
    if (type === "close") {
      const userConfirmed = window.confirm(
        "창을 닫으시겠습니까? 저장되지 않은 데이터는 사라집니다."
      );
      if (userConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== id));
      }
    } else {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 모달을 열고 닫는 함수
  const handleOpenModal = (payload) => {
    setIsModalOpen(true);
    setModalContents(payload);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex h-screen">
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50"
          onClick={handleCloseModal}
        ></div>
      )}
      <div className="absolute flex w-screen h-screen">
        {isModalOpen && (
          <div className="z-50 min-w-[600px]  flex flex-col items-center w-2/5 p-8 m-auto bg-white h-5/6">
            <div
              dangerouslySetInnerHTML={createMarkup(modalContents)}
              className="flex flex-col overflow-y-auto w-full h-full border-[1px] p-4  mb-4 border-BORDER border-solid"
            ></div>
            <Button onClick={handleCloseModal}>닫기</Button>
          </div>
        )}
      </div>
      <Sidebar handleOpenButton={handleOpenButton} />
      <ResizeDragZone
        DATA={data}
        clickedDiv={clickedDiv}
        setClickedDiv={setClickedDiv}
        handleOpenButton={handleOpenButton}
        handleCloseButton={handleCloseButton}
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
}

export default App;
