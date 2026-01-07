"use client";
import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number; // durée en ms
}

export default function Counter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(false);

  useEffect(() => {
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count}</span>;
}