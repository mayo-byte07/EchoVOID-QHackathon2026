'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AcousticFingerprint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const bars = 40;
    const barData = new Array(bars).fill(0);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        // Randomly fluctuate bar heights to simulate live audio
        const target = Math.random() * height * 0.8;
        barData[i] += (target - barData[i]) * 0.2;

        const x = i * barWidth;
        const h = barData[i];
        
        // Gradient for the bars
        const gradient = ctx.createLinearGradient(0, height, 0, height - h);
        gradient.addColorStop(0, '#dc2626'); // red-600
        gradient.addColorStop(1, '#fbbf24'); // amber-400

        ctx.fillStyle = gradient;
        // Rounded top bars
        ctx.beginPath();
        ctx.roundRect(x + 2, height - h, barWidth - 4, h, [4, 4, 0, 0]);
        ctx.fill();
        
        // Add a subtle glow at the top
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#dc262644';
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Acoustic Spectrogram</span>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-1 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className="flex-grow w-full" width={400} height={150} />
    </div>
  );
}
