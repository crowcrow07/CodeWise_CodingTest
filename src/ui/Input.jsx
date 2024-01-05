export default function Input({
  name,
  type,
  className,
  onChange,
  value,
  placeholder,
  checked,
}) {
  return (
    <input
      name={name || "NoName"}
      type={type || "text"}
      className={`${DEFAULT} ${className}`}
      onChange={onChange || console.log("onChange 설정안됨")}
      value={value}
      placeholder={placeholder || ""}
      checked={checked || ""}
    />
  );
}

const DEFAULT = "w-full h-[30px] px-[10px] rounded-[5px]";
