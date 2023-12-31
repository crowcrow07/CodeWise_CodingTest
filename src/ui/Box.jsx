import React from "react";

export default React.forwardRef(function Box(props, ref) {
  const { className, children, ...others } = props;
  return (
    <div
      {...others}
      ref={ref}
      className={`w-full h-full bg-white ${className}`}
    >
      {children}
    </div>
  );
});

// w-full h-full bg-green-500

// h-full w-full bg-white
