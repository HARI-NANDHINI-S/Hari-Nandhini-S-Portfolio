import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface FloatingSymbol {
  x: number;
  y: number;
  vy: number;
  char: string;
  size: number;
  color: string;
  alpha: number;
}

export const GlobalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracker for subtle repulsion/parallax
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 1. Neural Nodes
    const nodeCount = Math.min(45, Math.floor((width * height) / 25000));
    const nodes: Particle[] = [];
    const darkColors = ['#168BFF', '#38D9FF', '#FF852E'];
    const lightColors = ['rgba(8, 123, 234, 0.42)', 'rgba(0, 151, 194, 0.38)', 'rgba(239, 121, 40, 0.36)'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        color: darkColors[Math.floor(Math.random() * darkColors.length)],
      });
    }

    // 2. Floating Code & Math Symbols
    const symbolsList = ['{ }', '</>', '01', '10', '=>', 'λ', 'f(x)', 'def', 'import', 'σ(z)', '∑', '0', '1', 'AI', '&&', '||'];
    const floatingSymbols: FloatingSymbol[] = [];
    const symbolCount = Math.min(24, Math.floor(width / 60));

    for (let i = 0; i < symbolCount; i++) {
      floatingSymbols.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -0.2 - Math.random() * 0.4,
        char: symbolsList[Math.floor(Math.random() * symbolsList.length)],
        size: Math.floor(Math.random() * 6) + 11,
        color: Math.random() > 0.4 ? 'rgba(22, 139, 255, 0.28)' : 'rgba(255, 133, 46, 0.22)',
        alpha: Math.random() * 0.35 + 0.1,
      });
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light');

      // Draw floating code symbols
      ctx.textAlign = 'center';
      for (let s of floatingSymbols) {
        ctx.font = `${s.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = isLight 
          ? (s.color.includes('255, 133') ? 'rgba(239, 121, 40, 0.12)' : 'rgba(8, 123, 234, 0.14)')
          : s.color;
        ctx.fillText(s.char, s.x, s.y);

        if (!prefersReducedMotion) {
          s.y += s.vy;
          if (s.y < -20) {
            s.y = height + 20;
            s.x = Math.random() * width;
          }
        }
      }

      // Draw neural network lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const rawAlpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = isLight 
              ? `rgba(8, 123, 234, ${rawAlpha * 0.42})` 
              : `rgba(56, 217, 255, ${rawAlpha})`;
            ctx.lineWidth = isLight ? 0.7 : 0.85;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes & mouse interactions
      for (let idx = 0; idx < nodes.length; idx++) {
        const n = nodes[idx];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Mouse gentle repel
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            n.x -= (dx / dist) * force * 1.5;
            n.y -= (dy / dist) * force * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        
        if (isLight) {
          ctx.fillStyle = lightColors[idx % lightColors.length];
          ctx.shadowBlur = 0; // No neon glow in light mode
        } else {
          ctx.fillStyle = n.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = n.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic ambient radial gradients specifically tuned for dark and light modes */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyber-blue/5 dark:bg-cyber-blue/15 light:bg-blue-300/12 blur-[140px] pointer-events-none transition-colors duration-500" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-cyber-orange/5 dark:bg-cyber-orange/12 light:bg-amber-300/10 blur-[150px] pointer-events-none transition-colors duration-500" />
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-cyber-cyan/5 dark:bg-cyber-cyan/12 light:bg-cyan-300/10 blur-[140px] pointer-events-none transition-colors duration-500" />
      
      {/* Cyber Grid with theme-adapted opacity */}
      <div className="absolute inset-0 cyber-grid opacity-25 dark:opacity-60 light:opacity-25 pointer-events-none transition-opacity duration-300" />

      {/* Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

