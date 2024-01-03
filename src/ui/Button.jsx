export default function Button({
  type,
  onClick,
  children,
  className,
  disabled,
}) {
  return (
    <button
      type={type || "button"}
      onClick={onClick || (() => console.log(`${children} 버튼이 눌림`))}
      className={`${DEFAULT} ${className}`}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
}

const DEFAULT =
  "flex active:bg-SELECT_HIGHLIGHT active:scale-[0.95] items-center w-[60px] justify-center text-xs bg-white border rounded-md py-[7px] border-BORDER text-BLACK";
