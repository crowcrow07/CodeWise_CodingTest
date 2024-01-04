import { logo } from "../../assets/images";
import { sidebarData } from "../../utils/data";

export default function Sidebar({ handleOpenButton }) {
  return (
    <div className={`${BORDER} bg-SIDE_BAR min-w-[230px] p-2`}>
      <div className="flex items-center justify-center p-4 mb-8 border-b-2 border-solid border-BORDER">
        <img src={logo.codewise} alt="codewise" />
      </div>
      {sidebarData &&
        sidebarData.map((data) => {
          const { id, header } = data;
          const { title } = header;
          return (
            <div
              className={`${BORDER} text-white p-4 m-1 text-center text-[20px] cursor-pointer active:scale-95`}
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
