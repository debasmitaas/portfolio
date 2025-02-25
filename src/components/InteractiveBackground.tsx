import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
  opacity: number;
  color: string;
  size: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const colorIndex = useRef(0);
  
  // Updated colors to a white/blue/purple palette
  const colors = [
    { r: 255, g: 255, b: 255 },  // Pure White
    { r: 230, g: 230, b: 250 },  // Lavender
    { r: 176, g: 196, b: 222 },  // Light Steel Blue
    { r: 138, g: 43, b: 226 }    // Blue Violet
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const initPoints = () => {
      const baseColor = colors[0];
      pointsRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        opacity: Math.random() * 0.4 + 0.6, // Higher opacity range (0.6 to 1.0)
        color: `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, `,
        size: Math.random() * 3 + 2  // Varied sizes between 2-5
      }));
    };

    const drawPoint = (point: Point) => {
      if (!ctx) return;

      const distanceToMouse = Math.hypot(
        point.x - mousePosition.current.x,
        point.y - mousePosition.current.y
      );

      const glow = Math.max(0, 1 - distanceToMouse / 200) * 0.7; // Enhanced glow effect
      const currentColor = colors[colorIndex.current];
      
      // Update point color based on current theme
      point.color = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, `;
      
      // Create a radial gradient for the points
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, point.size * 2
      );
      
      gradient.addColorStop(0, `${point.color}${point.opacity + glow})`);
      gradient.addColorStop(1, `${point.color}0)`);
      
      // Draw point with gradient fill
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add an outer glow with a blue/purple tint for enhanced visibility
      const glowColor = `rgba(138, 43, 226, ${(point.opacity + glow) * 0.3})`; // Blue Violet glow
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();

      // Draw connections with enhanced visibility
      pointsRef.current.forEach(otherPoint => {
        const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
        if (distance < 150) { // Increased connection distance for better network effect
          const opacity = (1 - distance / 150) * 0.6; // Higher opacity for connections
          
          const gradient = ctx.createLinearGradient(point.x, point.y, otherPoint.x, otherPoint.y);
          gradient.addColorStop(0, `${point.color}${opacity})`);
          gradient.addColorStop(0.5, `rgba(176, 196, 222, ${opacity})`); // Light Steel Blue in middle
          gradient.addColorStop(1, `${otherPoint.color}${opacity})`);
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(otherPoint.x, otherPoint.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.8; // Thicker lines for better visibility
          ctx.stroke();
        }
      });
    };

    const updatePoint = (point: Point) => {
      point.x += point.dx;
      point.y += point.dy;

      // Bounce off edges with slight randomization
      if (point.x <= 0 || point.x >= canvas.width) {
        point.dx *= -1;
        point.dx += (Math.random() - 0.5) * 0.2;
      }
      if (point.y <= 0 || point.y >= canvas.height) {
        point.dy *= -1;
        point.dy += (Math.random() - 0.5) * 0.2;
      }

      // Keep points within bounds
      point.x = Math.max(0, Math.min(canvas.width, point.x));
      point.y = Math.max(0, Math.min(canvas.height, point.y));
      
      // Add slight random movement for more natural flow
      if (Math.random() < 0.02) {
        point.dx += (Math.random() - 0.5) * 0.2;
        point.dy += (Math.random() - 0.5) * 0.2;
      }
      
      // Limit speed
      const speed = Math.hypot(point.dx, point.dy);
      if (speed > 2.5) {
        point.dx = (point.dx / speed) * 2.5;
        point.dy = (point.dy / speed) * 2.5;
      }

      // Randomly adjust opacity for pulsing effect
      point.opacity += (Math.random() - 0.5) * 0.03;
      point.opacity = Math.max(0.6, Math.min(1.0, point.opacity));
      
      // Randomly adjust size for breathing effect
      if (Math.random() < 0.05) {
        point.size += (Math.random() - 0.5) * 0.5;
        point.size = Math.max(2, Math.min(5, point.size));
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with a very subtle light blue-purple tint instead of pure clear
      ctx.fillStyle = 'rgba(248, 248, 255, 0.1)'; // Very light ghostwhite with fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pointsRef.current.forEach(point => {
        updatePoint(point);
        drawPoint(point);
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Change color on hover near points with increased response
      let hovering = false;
      pointsRef.current.some(point => {
        const distance = Math.hypot(
          point.x - mousePosition.current.x,
          point.y - mousePosition.current.y
        );
        if (distance < 120) {
          hovering = true;
          return true;
        }
        return false;
      });
      
      if (hovering && Math.random() < 0.1) { // Occasional color change for smoother transition
        colorIndex.current = (colorIndex.current + 1) % colors.length;
      }
    };

    // Add a trail effect when mouse moves
    const handleMouseTrail = (e: MouseEvent) => {
      // Create new points at mouse position with burst effect
      if (Math.random() < 0.3) { // Only add occasionally to prevent overcrowding
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Add 1-3 points around mouse position
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 20;
          
          pointsRef.current.push({
            x: mouseX + Math.cos(angle) * distance,
            y: mouseY + Math.sin(angle) * distance,
            dx: (Math.random() - 0.5) * 1,
            dy: (Math.random() - 0.5) * 1,
            opacity: 0.8 + Math.random() * 0.2,
            color: `rgba(138, 43, 226, `, // Blue Violet for mouse trail
            size: Math.random() * 3 + 2
          });
          
          // Keep array at reasonable size
          if (pointsRef.current.length > 70) {
            pointsRef.current.shift();
          }
        }
      }
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousemove', handleMouseTrail);
    
    resizeCanvas();
    initPoints();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousemove', handleMouseTrail);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-bg fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'rgba(255, 255, 255, 0.95)' }} // Almost white background
    />
  );
};

export default InteractiveBackground;