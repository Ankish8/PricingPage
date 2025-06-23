"use client";
import * as React from "react";

export function ShineBorder({
  borderWidth = 2,
  duration = 4,
  color = ["#E8D5EA", "#FFFFFF"],
  className = "",
  children,
  ...props
}) {
  const borderColors = Array.isArray(color) ? color : [color];
  
  return (
    <div
      className={`relative rounded-2xl ${className}`}
      style={{
        padding: `${borderWidth}px`,
        background: `linear-gradient(135deg, ${borderColors.join(', ')})`,
        backgroundSize: '300% 300%',
        animation: `subtleShine ${duration}s ease-in-out infinite`
      }}
      {...props}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden h-full">
        {children}
      </div>
      <style>{`
        @keyframes subtleShine {
          0%, 100% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
