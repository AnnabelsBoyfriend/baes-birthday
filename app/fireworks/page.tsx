'use client';

import { useEffect, useRef, useState } from 'react';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });

export default function FireworksPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showMessage, setShowMessage] = useState(true);
  const [canLaunch, setCanLaunch] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMessage(false);
      setCanLaunch(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rockets: any[] = [];
    const particles: any[] = [];

    function randomBaseColor() {
      return {
        h: Math.floor(Math.random() * 360),
        s: 100,
        l: 60,
      };
    }

    function launchFirework(x: number, targetY: number, baseColor: { h: number; s: number; l: number }) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      rockets.push({
        x,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: -(6 + (canvas.height - targetY) * 0.01), // increase speed for higher targets
        targetY,
        baseColor,
      });
    }

    function explode(x: number, y: number, baseColor: { h: number; s: number; l: number }) {
      const count = 300;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 4 + 1;
        const lightnessVariation = (Math.random() - 0.5) * 20;
        const color = `hsl(${baseColor.h}, ${baseColor.s}%, ${Math.max(
          30,
          Math.min(100, baseColor.l + lightnessVariation)
        )}%)`;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
        });
      }
    }

    function animate() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.1;

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.baseColor);
          rockets.splice(i, 1);
        }
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.alpha -= 0.01;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    animate();

    function fireSingleRocket() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const center = canvas.width / 2;
      const spread = canvas.width * 0.3;
      const x = center + (Math.random() - 0.5) * spread;
      const targetY = canvas.height * (0.2 + Math.random() * 0.3);
      const baseColor = randomBaseColor();
      launchFirework(x, targetY, baseColor);
    }

    function fireRapidBurst() {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => fireSingleRocket(), i * 140);
      }
    }

    (window as any).launchFirework = fireSingleRocket;
    (window as any).rapidFireworks = fireRapidBurst;
  }, []);

  return (
    <div className="relative flex flex-col h-[100dvh] w-screen bg-pink-500 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      />
  
      {showMessage && (
        <div
          className={`z-10 absolute inset-0 flex items-center justify-center text-center px-4 ${pacifico.className}`}
        >
          <div className="bg-black/60 text-white text-sm rounded-xl px-6 py-4">
            Hi Bae, here's some fireworks for you since it's illegal to do fireworks here in BC.
            <br />
            <br />
            Click "Launch" after this disappears to make your own 💥
          </div>
        </div>
      )}
  
      {canLaunch && (
        <div className="z-10 mt-auto mb-10 flex justify-center gap-6">
          <button
            onClick={() => (window as any).launchFirework()}
            className="bg-white/90 text-pink-700 px-4 py-2 rounded-full font-semibold text-sm shadow hover:bg-white transition flex items-center gap-2"
          >
            <span className="text-base">🎆</span>
            <span>Single</span>
          </button>
  
          <button
            onClick={() => (window as any).rapidFireworks()}
            className="bg-white/90 text-pink-700 px-4 py-2 rounded-full font-semibold text-sm shadow hover:bg-white transition flex items-center gap-2"
          >
            <span className="text-base">🎇</span>
            <span>Rapid</span>
          </button>
        </div>
      )}
    </div>
  );
}  