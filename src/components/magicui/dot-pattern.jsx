import React from 'react';

export function DotPattern({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  className = "",
  style = {},
  ...props
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={style}
      {...props}
    >
      <defs>
        <pattern
          id="dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={cx}
            cy={cy}
            r={cr}
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#dot-pattern)" 
      />
    </svg>
  );
}