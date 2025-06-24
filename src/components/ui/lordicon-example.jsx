import React, { useRef, useEffect } from 'react';
import { Player } from '@lordicon/react';

// Example component showing how to use Lordicon
// You'll need to download icon JSON files from lordicon.com (free icons available)
export const LordIconExample = ({ iconData, size = 64, trigger = "hover", colors = {} }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (trigger === "loop") {
      playerRef.current?.playFromBeginning();
    }
  }, [trigger]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      playerRef.current?.playFromBeginning();
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      playerRef.current?.playFromBeginning();
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ 
        width: size, 
        height: size,
        cursor: trigger === "click" ? "pointer" : "default"
      }}
    >
      <Player 
        ref={playerRef} 
        icon={iconData}
        size={size}
        colorize={colors}
      />
    </div>
  );
};

export default LordIconExample;