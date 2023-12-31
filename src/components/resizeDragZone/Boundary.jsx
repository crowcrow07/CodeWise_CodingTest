import React from "react";

export default React.forwardRef(function Boundary(props, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={
        "relative h-screen overflow-hidden bg-BACKGROUND " + props.className
      }
    />
  );
});

// dark:bg-[#121212]
// rounded-xl
