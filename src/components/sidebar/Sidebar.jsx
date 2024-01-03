import { useEffect, useState } from "react";
import { logo } from "../../assets/images";
import { windowImg } from "../../assets/images";

const getData = [
  {
    id: 0,
    header: {
      title: "컨텐츠 목록",
      icon: windowImg.baseline,
    },

    location: { X: 0, Y: 0 },
    area: { W: 1145, H: 352 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 700, MIN_H: 322 },
  },
  {
    id: 1,
    header: {
      title: "컨텐츠 설정",
      icon: null,
    },

    location: { X: 0, Y: 0 },
    area: { W: 1145, H: 620 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 500, MIN_H: 620 },
  },
];

export default function Sidebar({ handleOpenButton }) {
  const [initData, setInitData] = useState(null);
  useEffect(() => {
    setInitData(getData);
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
