import React from "react";

export const ShimmerButton = React.forwardRef(
  (
    {
      shimmerColor = "#ffffff",
      shimmerDuration = "3s",
      borderRadius = "12px",
      background = "#7A2187",
      className = "",
      children,
      style = {},
      ...props
    },
    ref,
  ) => {
    const shimmerStyles = {
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      border: 'none',
      borderRadius: borderRadius,
      background: background,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      ...style
    };

    const shimmerOverlayStyles = {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
      animation: `shimmer ${shimmerDuration} infinite`,
      zIndex: 1
    };

    const contentStyles = {
      position: 'relative',
      zIndex: 2
    };

    return (
      <>
        <style>{`
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          .shimmer-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(122, 33, 135, 0.3);
          }
          
          .shimmer-button:active {
            transform: translateY(0px);
          }
        `}</style>
        <button
          ref={ref}
          className={`shimmer-button ${className}`}
          style={shimmerStyles}
          {...props}
        >
          <div style={shimmerOverlayStyles}></div>
          <div style={contentStyles}>
            {children}
          </div>
        </button>
      </>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";