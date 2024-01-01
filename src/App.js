import { useState } from "react";

import Sidebar from "./components/sidebar/Sidebar";
import ResizeDragZone from "./components/resizeDragZone/ResizeDragZone";

import { DATA } from "./utils/DATA";

function App() {
  const [data, setData] = useState(DATA);
  const [clickedDiv, setClickedDiv] = useState(null);

  const handleOpenButton = (sidebar) => {
    const isIdExist = data.some((item) => item.id === sidebar.id);

    if (!isIdExist) {
      setData((prev) => [...prev, sidebar]);
    }
    setClickedDiv(sidebar.id);
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

  return (
    <div className="flex h-screen">
      <Sidebar DATA={data} handleOpenButton={handleOpenButton} />
      <ResizeDragZone
        DATA={data}
        clickedDiv={clickedDiv}
        setClickedDiv={setClickedDiv}
        handleCloseButton={handleCloseButton}
      />
    </div>
  );
}

export default App;
