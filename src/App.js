import { useState } from "react";

import Sidebar from "./components/sidebar/Sidebar";
import ResizeDragZone from "./components/resizeDragZone/ResizeDragZone";

import { initData } from "./utils/data";

function App() {
  const [data, setData] = useState(initData);
  const [clickedDiv, setClickedDiv] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenButton = (payload) => {
    const isIdExist = data.some((item) => item.id === payload.id);

    if (!isIdExist) {
      setData((prev) => [...prev, payload]);
    }
    setClickedDiv(payload.id);
  };

  const handleCloseButton = (id) => {
    const userConfirmed = window.confirm(
      "창을 닫으시겠습니까? 저장되지 않은 데이터는 사라집니다."
    );

    if (userConfirmed) {
      setData((prev) => {
        const updatedData = prev.filter((item) => item.id !== id);
        return updatedData;
      });
    }
  };

  // 모달을 열고 닫는 함수
  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="relative flex h-screen">
      {/* {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50"
          onClick={handleCloseModal}
        ></div>
      )}

      <div className="absolute flex w-screen h-screen">
        {isModalOpen && (
          <div className="z-50 p-16 m-auto bg-white">
            <div>모달창을 넣을 곳</div>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        )}
      </div> */}
      <Sidebar DATA={data} handleOpenButton={handleOpenButton} />
      <ResizeDragZone
        DATA={data}
        clickedDiv={clickedDiv}
        setClickedDiv={setClickedDiv}
        handleOpenButton={handleOpenButton}
        handleCloseButton={handleCloseButton}
      />
    </div>
  );
}

export default App;
