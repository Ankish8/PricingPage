"use client";

import React, { useEffect, useRef, useState } from 'react';

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className = "",
  decimalPlaces = 0,
  suffix = "",
  ...props
}) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(startValue);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setTimeout(() => {
            setHasStarted(true);
          }, delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const target = direction === "down" ? startValue : value;
    const start = direction === "down" ? value : startValue;
    const difference = target - start;
    const duration = 2000; // 2 seconds
    const stepTime = 50; // Update every 50ms
    const steps = duration / stepTime;
    const stepValue = difference / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newValue = start + (stepValue * currentStep);
      
      if (currentStep >= steps) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(newValue);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, value, startValue, direction]);

  const formattedValue = displayValue.toFixed(decimalPlaces);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums tracking-wider ${className}`}
      {...props}
    >
      {formattedValue}{suffix}
    </span>
  );
}