export default function TableHeader({ children }) {
  return <div className={`${tableHeader}`}>{children}</div>;
}

const tableHeader =
  "w-[120px] bg-SETTING_HEADER flex justify-center items-center text-white";
