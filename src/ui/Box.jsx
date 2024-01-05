import React from "react";

export default React.forwardRef(function Box(props, ref) {
  const { className, children, ...others } = props;
  return (
    <div {...others} ref={ref} className={`w-full bg-white ${className}`}>
      {children}
    </div>
  );
});
