import React, { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "../../lib/utils";

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = "solid";

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full border shadow-xl`}
            style={{
              "--i": i,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: "1px",
              borderColor: `rgba(122, 33, 135, 0.3)`,
              backgroundColor: `rgba(122, 33, 135, 0.1)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
              animationDuration: "4s",
              animationIterationCount: "infinite",
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";

export { Ripple };