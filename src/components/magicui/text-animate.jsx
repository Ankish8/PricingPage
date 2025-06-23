"use client";

import React, { useEffect, useRef, useState } from 'react';

export function TextAnimate({
  children,
  className = "",
  animation = "fadeIn",
  by = "word",
  delay = 0,
  duration = 0.3,
  startOnView = true,
  once = true,
  staggerDelay = 0.1,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(!startOnView);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          if (once) {
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, once, delay]);

  const getAnimationClass = (index = 0) => {
    const baseDelay = delay + (index * staggerDelay);
    switch (animation) {
      case "blurIn":
        return `animate-[blur-in_${duration}s_ease-out_${baseDelay}s_forwards] opacity-0`;
      case "slideUp":
        return `animate-[slide-up_${duration}s_ease-out_${baseDelay}s_forwards] opacity-0`;
      case "fadeIn":
      default:
        return `animate-[fade-in_${duration}s_ease-out_${baseDelay}s_forwards] opacity-0`;
    }
  };

  let segments = [];
  switch (by) {
    case "word":
      segments = children.split(/(\\s+)/);
      break;
    case "character":
      segments = children.split("");
      break;
    default:
      segments = [children];
  }

  return (
    <div ref={ref} className={`whitespace-pre-wrap ${className}`} {...props}>
      {segments.map((segment, i) => (
        <span
          key={i}
          className={`inline-block ${isVisible ? getAnimationClass(i) : ""}`}
        >
          {segment}
        </span>
      ))}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blur-in {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}