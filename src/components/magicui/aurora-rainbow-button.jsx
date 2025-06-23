import React from 'react';
import { RainbowButton } from './rainbow-button';

/**
 * Aurora Rainbow Button Component
 * 
 * This is the working rainbow button with animated glowing border effect.
 * Includes the specific container structure needed for the rainbow animation to work.
 * 
 * Usage:
 * <AuroraRainbowButton>Get Premium Now</AuroraRainbowButton>
 */
export const AuroraRainbowButton = ({ children, ...props }) => {
  return (
    <div style={{
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 3
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <RainbowButton {...props}>
          {children}
        </RainbowButton>
      </div>
    </div>
  );
};

export default AuroraRainbowButton;