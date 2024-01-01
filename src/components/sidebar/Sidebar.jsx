import { useEffect, useState } from "react";
import { logo } from "../../assets/images";

export default function Sidebar({ DATA, handleOpenButton }) {
  const [initData, setInitData] = useState(null);
  useEffect(() => {
    setInitData(DATA);
  }, []);

  return (
    <div className={`${BORDER} bg-SIDE_BAR min-w-[230px] p-2`}>
      <div className="flex items-center justify-center p-4 mb-8 border-b-2 border-solid border-BORDER">
        <img src={logo.codewise} alt="codewise" />
      </div>
      {initData &&
        initData.map((data) => {
          const { id, header } = data;
          const { title } = header;
          return (
            <div
              className={`${BORDER} text-white p-4 m-1 text-center text-[20px] cursor-pointer active:scale-95 active:bg-SELECT_HIGHLIGHT`}
              key={id}
              onClick={() => handleOpenButton(data)}
            >
              {title}
            </div>
          );
        })}
    </div>
  );
}

const BORDER = "border-[1px] border-solid border-BORDER";
