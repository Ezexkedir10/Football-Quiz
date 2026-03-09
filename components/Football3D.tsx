'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Football3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;

    let rotation = 0;

    const drawFootball = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Save context state
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      // Draw main football shape (ellipse)
      ctx.fillStyle = '#1f2937';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;

      // Football body
      ctx.beginPath();
      ctx.ellipse(0, 0, 100, 60, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // White stitches down the middle
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.lineTo(0, 50);
      ctx.stroke();
      ctx.setLineDash([]);

      // Laces details
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      for (let i = -30; i <= 30; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, -45);
        ctx.lineTo(i, -50);
        ctx.stroke();
      }

      // 3D effect with shadows
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(0, 65, 100, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Continuous rotation
      rotation += 0.02;
      requestAnimationFrame(drawFootball);
    };

    drawFootball();

    return () => {
      // Cleanup handled by React
    };
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <canvas
        ref={canvasRef}
        className="drop-shadow-lg"
      />
    </motion.div>
  );
}
