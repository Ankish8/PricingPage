"use client";
import React from "react";

export function MagicCard({
  children,
  className = "",
  gradientColor = "rgba(122, 33, 135, 0.1)"
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientColor}, transparent)`
      }}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
