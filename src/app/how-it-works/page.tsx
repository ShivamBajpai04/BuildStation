"use client";

import { GrainyTexture } from "@/components/effects/grainy-texture";
import { EnhancedSection } from "@/components/enhanced-layout";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Award, Zap, BriefcaseIcon } from "lucide-react";
import { useRef, useState, useEffect, ReactNode } from "react";

// Enhanced Floating animation component for stats cards
function FloatingElement({ children, yOffset = 15, duration = 6, delay = 0 }: { children: ReactNode, yOffset?: number, duration?: number, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-yOffset/2, yOffset/2, -yOffset/2] }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// Stat Card with Spotlight Effect
function StatCardWithSpotlight({ 
  icon, 
  title, 
  value, 
  color, 
  className 
}: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  color: string, 
  className?: string 
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`w-44 rounded-md bg-gradient-to-br from-[#1c1b1b] to-[#121116] border border-[${color}]/20 p-3 shadow-lg relative overflow-hidden transition-transform duration-300 ${
        isHovering ? 'scale-105' : 'scale-100'
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight effect */}
      {isHovering && (
        <div
          className="absolute pointer-events-none inset-0 opacity-40 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
          }}
        />
      )}
      
      <div className="flex flex-col items-center gap-2 relative z-10">
        <div className={`h-9 w-9 rounded-full bg-[${color}]/20 border border-[${color}]/30 flex items-center justify-center`}>
          {icon}
        </div>
        <div className="text-center">
          <p className={`text-xs text-[${color}] font-medium`}>{title}</p>
          <p className="text-lg font-bold text-white mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Enhanced video container with interactive elements
function EnhancedVideoContainer() {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Mouse position values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smoother animation
  const springConfig = { damping: 25, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  // Transform values for rotation
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
    
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  return (
    <div className="max-w-3xl mx-auto my-12 px-4 sm:px-6 lg:px-12 relative z-10">
      <motion.div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden shadow-2xl border border-[#3b82f6]/20"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale: isHovering ? 1.02 : 1,
          transition: 'scale 0.3s ease-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          x.set(0);
          y.set(0);
        }}
      >
        {/* Video play area with spotlight effect */}
        <div className="aspect-video w-full relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#3b82f630 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          />
          
          {/* Spotlight effect */}
          {isHovering && (
            <div
              className="absolute pointer-events-none w-[300px] h-[300px] opacity-30 mix-blend-soft-light"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                transform: `translate(${mousePosition.x - 150}px, ${mousePosition.y - 150}px)`,
                transition: "transform 0.05s ease-out",
              }}
            />
          )}
          
          {isMounted && (
            <video
              className="w-full h-full object-cover z-10 relative"
              controls
              poster="/placeholder.svg?height=600&width=800"
            >
              <source src="/demo-placeholder.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Video control bar overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/50 backdrop-blur-sm z-20 flex items-center px-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ab5137]/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#c89d4a]/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/70"></div>
            </div>
            <div className="flex items-center mx-auto">
              <BriefcaseIcon className="h-3 w-3 text-[#c89d4a] mr-1.5" />
              <div className="text-xs text-gray-400 font-mono">BlockBlockJob Demo</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen flex flex-col py-12 overflow-hidden bg-[#121116]">
      {/* Grid background pattern */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#3b82f618 1px, transparent 1px), linear-gradient(to right, #3b82f618 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Curved gradient overlay */}
      <div className="absolute inset-0 opacity-60 z-0 bg-gradient-to-tr from-[#121116]/0 via-purple-600/5 to-indigo-500/20" />

      {/* Particle-like grainy texture */}
      <GrainyTexture opacity={0.15} blend="soft-light" />
      
      <div className="mx-auto max-w-4xl space-y-10 relative z-10 container px-4">
        
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground">
              Watch our demo to see how our AI platform transforms your workflow
              in minutes.
            </p>
          </div>
 
          {/* Left floating stat card - positioned to be fully visible with max z-index */}
          <div className="absolute top-1/3 md:-left-8 z-50 hidden md:block">
            <FloatingElement yOffset={10} duration={6} delay={0.2}>
              <StatCardWithSpotlight 
                icon={<Award className="h-4 w-4 text-[#3b82f6]" />}
                title="Task Automation"
                value="+85%"
                color="#3b82f6"
              />
            </FloatingElement>
          </div>

          {/* Right floating stat card - positioned to be fully visible with max z-index */}
          <div className="absolute bottom-1/3 md:-right-8 z-50 hidden md:block">
            <FloatingElement yOffset={10} duration={5.5} delay={0.5}>
              <StatCardWithSpotlight 
                icon={<Zap className="h-4 w-4 text-[#c89d4a]" />}
                title="Productivity"
                value="+200%"
                color="#c89d4a"
              />
            </FloatingElement>
          </div>

          {/* Enhanced interactive video container */}
          <EnhancedVideoContainer />

          {/* Mobile-only stat cards for smaller screens */}
          <div className="flex justify-center gap-6 mt-6 md:hidden">
            <div className="w-32 rounded-md bg-gradient-to-br from-[#1c1b1b] to-[#121116] border border-[#3b82f6]/20 p-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 flex items-center justify-center">
                  <Award className="h-3 w-3 text-[#3b82f6]" />
                </div>
                <div>
                  <p className="text-xs text-[#3b82f6] font-medium">Automation</p>
                  <p className="text-sm font-bold text-white">+85%</p>
                </div>
              </div>
            </div>
            <div className="w-32 rounded-md bg-gradient-to-br from-[#1c1b1b] to-[#121116] border border-[#c89d4a]/20 p-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#c89d4a]/20 border border-[#c89d4a]/30 flex items-center justify-center">
                  <Zap className="h-3 w-3 text-[#c89d4a]" />
                </div>
                <div>
                  <p className="text-xs text-[#c89d4a] font-medium">Productivity</p>
                  <p className="text-sm font-bold text-white">+200%</p>
                </div>
              </div>
            </div>
          </div>
        
          <h2 className="text-center text-2xl font-bold mb-10">Three Simple Steps</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1: Sign Up */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-lg hover:shadow-primary/5 transition-all">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4 flex items-center justify-center h-16 w-16">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Sign Up</h3>
              <p className="text-muted-foreground text-center">
                Create your account and choose the plan that fits your team&apos;s
                needs.
              </p>
            </div>
            
            {/* Step 2: Connect Your Data */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-lg hover:shadow-primary/5 transition-all">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4 flex items-center justify-center h-16 w-16">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Connect Your Data</h3>
              <p className="text-muted-foreground text-center">
                Integrate with your existing tools through our simple API
                connections.
              </p>
            </div>
            
            {/* Step 3: Automate & Scale */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-lg hover:shadow-primary/5 transition-all">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4 flex items-center justify-center h-16 w-16">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Automate & Scale</h3>
              <p className="text-muted-foreground text-center">
                Let our AI learn from your workflow and automate repetitive
                tasks.
              </p>
            </div>
          </div>

      </div>
      
      {/* Decorative elements - enhanced with animation */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[#3b82f6]/10 filter blur-[80px] opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[#ab5137]/10 filter blur-[100px] opacity-50 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </main>
  );
}
