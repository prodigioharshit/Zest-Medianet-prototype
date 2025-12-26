
import React, { useEffect, useRef } from 'react';

const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      r: number;
      d: number;
      w: number;
      h: number;

      constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 3 + 1; // radius
        this.d = Math.random() * particleCount; // density
      }

      update() {
        this.y += Math.cos(this.d) + 1 + this.r / 2;
        this.x += Math.sin(this.d) * 2;

        if (this.x > this.w + 5 || this.x < -5 || this.y > this.h) {
          if (Math.random() > 0.3) {
            this.x = Math.random() * this.w;
            this.y = -10;
          } else {
            if (Math.sin(this.d) > 0) {
              this.x = -5;
              this.y = Math.random() * this.h;
            } else {
              this.x = this.w + 5;
              this.y = Math.random() * this.h;
            }
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ filter: 'blur(1px)' }}
    />
  );
};

export default SnowEffect;
