import React from 'react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const rainbowButtonVariants = {
  default: "rainbow-btn-primary",
  outline: "border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-black [background-clip:padding-box,border-box,border-box] [background-origin:border-box] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.75rem)]"
};

export const RainbowButton = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  style = {},
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        "rainbow-btn-magic relative cursor-pointer group transition-all inline-flex items-center justify-center gap-2 shrink-0 rounded-sm outline-none focus-visible:ring-[3px] text-sm font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 h-11 px-8",
        rainbowButtonVariants[variant],
        className
      )}
      style={{
        '--color-1': '#7A2187',
        '--color-2': '#9B4AA3', 
        '--color-3': '#E8D5EA',
        '--color-4': '#7A2187',
        '--color-5': '#9B4AA3',
        padding: '1rem 2.5rem',
        fontSize: '1.125rem',
        fontWeight: '600',
        borderRadius: '12px',
        ...style
      }}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

RainbowButton.displayName = "RainbowButton";