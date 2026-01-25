'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import type { Skill } from '@/types/skill';

interface ConnectedSkillsProps {
  skills: Skill[];
}

interface Node extends Skill {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
}

export default function ConnectedSkills({ skills }: ConnectedSkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Initialize off-screen

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize nodes
  useEffect(() => {
    if (dimensions.width === 0) return;

    setNodes(prevNodes => {
      if (prevNodes.length > 0) return prevNodes; // Don't reset on small resizes if already exists
      
      return skills.map((skill, index) => ({
        ...skill,
        id: index,
        x: Math.random() * dimensions.width * 0.8 + dimensions.width * 0.1,
        y: Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1,
        vx: (Math.random() - 0.5) * 2.5, // Increased velocity
        vy: (Math.random() - 0.5) * 2.5,
      }));
    });
  }, [skills, dimensions.width, dimensions.height]);

  // Physics Loop
  useEffect(() => {
    if (nodes.length === 0) return;

    let animationFrameId: number;

    const animate = () => {
      setNodes(prevNodes => {
        return prevNodes.map(node => {
          let { x, y, vx, vy } = node;

          // Mouse Repulsion
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 300; // Large interaction radius

          if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * force * 1.5;
            const moveY = Math.sin(angle) * force * 1.5;
            
            vx += moveX;
            vy += moveY;
          }

          // Constant Wander (Brownian motion)
          vx += (Math.random() - 0.5) * 0.1;
          vy += (Math.random() - 0.5) * 0.1;

          // Enforce Minimum and Maximum Speed
          const currentSpeed = Math.sqrt(vx * vx + vy * vy);
          const minSpeed = 0.8; // Never stop moving
          const maxSpeed = 3.0; // Don't get too crazy

          if (currentSpeed < minSpeed && currentSpeed > 0) {
             vx = (vx / currentSpeed) * minSpeed;
             vy = (vy / currentSpeed) * minSpeed;
          } else if (currentSpeed > maxSpeed) {
             vx = (vx / currentSpeed) * maxSpeed;
             vy = (vy / currentSpeed) * maxSpeed;
          }
          
          // If completely stopped (rare), give random push
          if (currentSpeed === 0) {
             vx = (Math.random() - 0.5) * minSpeed;
             vy = (Math.random() - 0.5) * minSpeed;
          }

          // Update position
          x += vx;
          y += vy;

          // Wall bounce
          const padding = 50; 
          if (x <= padding) { x = padding; vx = Math.abs(vx); }
          if (x >= dimensions.width - padding) { x = dimensions.width - padding; vx = -Math.abs(vx); }
          if (y <= padding) { y = padding; vy = Math.abs(vy); }
          if (y >= dimensions.height - padding) { y = dimensions.height - padding; vy = -Math.abs(vy); }

          return { ...node, x, y, vx, vy };
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[600px] overflow-hidden bg-black/20 rounded-3xl border border-white/10 backdrop-blur-sm group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Cursor Glow */}
      <div 
         className="absolute w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
         style={{
           left: -150, // Center offset
           top: -150, 
           transform: `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px)`,
         }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => 
          nodes.slice(i + 1).map((otherNode, j) => {
            const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
            const connectionDistance = 300; // Increased connection distance
            
            if (distance < connectionDistance) {
              return (
                <motion.line
                  key={`${node.id}-${otherNode.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={otherNode.x}
                  y2={otherNode.y}
                  stroke="rgba(6, 182, 212, 0.2)"
                  strokeWidth={Math.max(0.5, 3 - distance / 100)}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {nodes.map((node) => (
        <motion.div
           key={node.id}
           className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full glass border border-white/10 flex items-center justify-center z-10 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-colors duration-300"
           style={{ 
             left: node.x, 
             top: node.y,
             backgroundColor: 'rgba(10, 10, 10, 0.6)' 
           }}
           whileHover={{ scale: 1.25, zIndex: 50, border: '2px solid rgba(6, 182, 212, 0.8)' }}
        >
          <div className="relative w-12 h-12 pointer-events-none">
            <Image
              src={node.icon}
              alt={node.name}
              fill
              className="object-contain p-1"
            />
          </div>
          
          {/* Tooltip */}
          <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-black/90 px-4 py-2 rounded-xl text-sm whitespace-nowrap border border-primary/30 text-primary font-bold pointer-events-none shadow-xl z-50">
            {node.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
