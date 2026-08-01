import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: 'heart' | 'petal' | 'sparkle' | 'star';
  pulse: number;
  pulseSpeed: number;
}

interface HeartCanvasProps {
  burstCount?: number;
  triggerBurst?: boolean;
  themeColor?: string;
}

export const HeartCanvas: React.FC<HeartCanvasProps> = ({
  triggerBurst = false,
  themeColor = '#f43f5e'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameId = useRef<number | null>(null);

  const colors = [
    themeColor,
    '#fb7185',
    '#f472b6',
    '#e11d48',
    '#fda4af',
    '#fef08a', // golden glow
    '#ffffff'  // white sparkle
  ];

  const createParticle = (
    w: number,
    h: number,
    isBurst = false,
    originX?: number,
    originY?: number
  ): Particle => {
    const x = isBurst && originX !== undefined ? originX : Math.random() * w;
    const y = isBurst && originY !== undefined ? originY : h + Math.random() * 40;

    const types: ('heart' | 'petal' | 'sparkle' | 'star')[] = ['heart', 'heart', 'petal', 'sparkle', 'star'];
    const type = isBurst ? (Math.random() > 0.3 ? 'heart' : 'sparkle') : types[Math.floor(Math.random() * types.length)];

    const angle = isBurst ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
    const speedMultiplier = isBurst ? 2 + Math.random() * 7 : 0.4 + Math.random() * 1.5;

    return {
      x,
      y,
      size: type === 'heart' ? 12 + Math.random() * 20 : 6 + Math.random() * 12,
      speedX: Math.cos(angle) * speedMultiplier + (isBurst ? 0 : (Math.random() - 0.5) * 0.5),
      speedY: Math.sin(angle) * speedMultiplier - (isBurst ? 0 : 0.6),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      opacity: isBurst ? 0.9 + Math.random() * 0.1 : 0.3 + Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      type,
      pulse: Math.random() * Math.PI,
      pulseSpeed: 0.03 + Math.random() * 0.04
    };
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;

    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, -d / 4);
    ctx.bezierCurveTo(-d / 2, -d / 1.2, -d, -d / 3, 0, d / 2);
    ctx.bezierCurveTo(d, -d / 3, d / 2, -d / 1.2, 0, -d / 4);
    ctx.fill();
    ctx.restore();
  };

  const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity * 0.8;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, size / 2, size, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Burst screen fill effect
  const spawnBurst = (cx?: number, cy?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const originX = cx ?? w / 2;
    const originY = cy ?? h / 2;

    for (let i = 0; i < 90; i++) {
      particlesRef.current.push(createParticle(w, h, true, originX, originY));
    }
  };

  useEffect(() => {
    if (triggerBurst) {
      spawnBurst();
    }
  }, [triggerBurst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial ambient particles
    particlesRef.current = Array.from({ length: 45 }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Maintain ambient particle count
      if (particlesRef.current.length < 50) {
        particlesRef.current.push(createParticle(w, h));
      }

      particlesRef.current.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.pulse += p.pulseSpeed;

        const pulsedSize = p.size + Math.sin(p.pulse) * 3;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, Math.max(4, pulsedSize), p.color, p.opacity, p.rotation);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, pulsedSize, p.color, p.opacity, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, pulsedSize, p.color, p.opacity);
        }

        // Fade out burst particles or wrap ambient around
        if (p.opacity < 0.05 || p.y < -50 || p.x < -50 || p.x > w + 50 || p.y > h + 50) {
          particlesRef.current.splice(index, 1);
        }
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    // Touch / click sparkle trail
    const handleTouch = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      for (let i = 0; i < 4; i++) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height, true, clientX, clientY));
      }
    };

    window.addEventListener('mousemove', handleTouch);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
