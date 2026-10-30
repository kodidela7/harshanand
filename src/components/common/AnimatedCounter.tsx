"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number; // duration in milliseconds
  suffix?: React.ReactNode;
  separator?: boolean;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2000,
  suffix = null,
  separator = false,
  className = "",
}: AnimatedCounterProps) {
  // Initialize with 'to' for SSR/SEO, then reset on mount when client activates
  const [count, setCount] = useState<number>(to);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // If already animated, keep final count
    if (hasAnimated) return;

    // Reset to starting value on client mount
    setCount(from);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const startTime = performance.now();
            const startVal = from;
            const endVal = to;

            const updateNumber = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease Out Quart curve: fast acceleration, smooth graceful landing
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const currentVal = Math.round(startVal + (endVal - startVal) * easeProgress);

              setCount(currentVal);

              if (progress < 1) {
                requestAnimationFrame(updateNumber);
              } else {
                setCount(endVal);
              }
            };

            requestAnimationFrame(updateNumber);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
      observer.disconnect();
    };
  }, [from, to, duration, hasAnimated]);

  // Format with commas if separator is true (e.g., 1,200)
  const displayValue = separator
    ? count.toLocaleString("en-US")
    : count.toString();

  return (
    <span ref={elementRef} className={`inline-flex items-baseline ${className}`}>
      <span>{displayValue}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

