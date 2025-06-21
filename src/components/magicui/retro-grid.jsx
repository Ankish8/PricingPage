"use client";

import { cn } from "../../lib/utils";

/**
 * RetroGrid component - An animated scrolling retro grid effect
 */
export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "rgba(255, 255, 255, 0.3)",
  darkLineColor = "rgba(255, 255, 255, 0.3)",
  ...props
}) {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden",
        `opacity-[var(--opacity)]`,
        className,
      )}
      style={gridStyles}
      {...props}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          perspective: '200px',
          transform: 'rotateX(var(--grid-angle))'
        }}
      >
        <div 
          className="animate-grid"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--light-line) 1px, transparent 0),
              linear-gradient(to bottom, var(--light-line) 1px, transparent 0)
            `,
            backgroundRepeat: 'repeat',
            backgroundSize: 'var(--cell-size) var(--cell-size)',
            height: '300vh',
            inset: '0% 0px',
            marginLeft: '-200%',
            transformOrigin: '100% 0 0',
            width: '600vw'
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
    </div>
  );
}