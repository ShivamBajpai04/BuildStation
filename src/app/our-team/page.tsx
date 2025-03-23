"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Image from "next/image";
import { Linkedin, Github, Mail, ArrowRight, X, Sparkles, Zap, BarChart, Search, Box, Briefcase } from "lucide-react";
import Link from "next/link";
import { ThemeEffect } from "@/components/theme-effect";
import { motion } from "framer-motion";
import { EnhancedSection } from "@/components/enhanced-layout";
import { GrainyTexture } from "@/components/effects/grainy-texture";
import GrainEffect from "@/components/grain-effect";


// Define the TeamMember type to fix type errors
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
  funFact: string;
  quote: string;
  department: string;
  color: string;
  emoji: string;
}

export default function TeamPage() {
  // Update state with proper typing
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add type for the event parameter
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const teamMembers = [
    {
      name: "Shivam Mahajan",
      role: "CEO & Co-Founder",
      bio: "",
      image: "/avatars/sm.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/mahajanshivam/",
        github: "https://github.com/smresponsibilities",
        email: "shivammahajan.mail.com",
      },
      funFact: "Can solve a Rubik&apos;s cube in under a minute",
      quote:
        "AI isn&apos;t just about automation—it&apos;s about augmenting human potential.",
      department: "leadership",
      color: "from-blue-500 to-purple-500",
      emoji: "♟️",
    },
    {
      name: "Shivam Bajpai",
      role: "CTO & Co-Founder",
      bio: "",
      image: "/avatars/sb.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/shivam-bajpai-1497091b4/",
        github: "https://github.com/ShivamBajpai04",
        email: "shivambajpai04@gmail.com",
      },
      funFact: "Builds custom mechanical keyboards as a hobby",
      quote:
        "The best code is no code at all. The second best is code that's so clear it speaks for itself.",
      department: "technology",
      color: "from-green-500 to-[#3b82f6]",
      emoji: "🚀",
    },
    {
      name: "Shivanshu",
      role: "CO & Co-Founder",
      bio: "",
      image: "/avatars/s.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/shivanshuk28/",
        github: "https://github.com/Shivanshuk28",
        email: "2contactshivanshu@gmail.com",
      },
      funFact: "Former competitive chess player",
      quote:
        "Great products don&apos;t just solve problems—they create possibilities.",
      department: "product",
      color: "from-orange-500 to-red-500",
      emoji: "✨",
    }
  ];

  return (
    <main className="min-h-screen overflow-hidden scroll-smooth" id="top">
      {/* Global background effects - using a more subtle grain */}
      <ThemeEffect />
      <GrainEffect />
      <GrainyTexture opacity={0.15} blend="soft-light" />

      {/* Custom cursor */}
      {isHovering && (
        <div
          className="fixed w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm z-50 pointer-events-none flex items-center justify-center text-primary font-medium"
          style={{
            left: cursorPosition.x - 48,
            top: cursorPosition.y - 48,
            transform: "translate(0, 0)",
            transition: "transform 0.1s ease-out, opacity 0.3s ease",
          }}
        >
          View Profile
        </div>
      )}

      {/* Interactive Hero Section */}
      <EnhancedSection 
        className="min-h-screen flex items-center justify-center overflow-hidden"
        withParticles={true}
        particleColor="rgba(82, 170, 173, 0.3)"
        lineColor="rgba(171, 81, 55, 0.15)"
        backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#3b82f6]/5 to-indigo-500/10"
        grainColor="rgba(82, 170, 173, 0.03)"
        grainOpacity={0.12}
      >
        <div className="container relative px-4 md:px-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-12 text-center"
            >
              <div className="inline-flex items-center px-4 py-1.5 mb-6 text-xs md:text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Meet the minds behind BuildStation
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-text-shimmer">
                Our Team
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                We&apos;re not just building AI—we&apos;re building the future of work. Meet
                the diverse team of experts making it happen.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm inline-flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-2" /> Innovators
                </div>
                <div className="px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm inline-flex items-center">
                  <BarChart className="w-3.5 h-3.5 mr-2" /> Problem Solvers
                </div>
                <div className="px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm inline-flex items-center">
                  <Search className="w-3.5 h-3.5 mr-2" /> Visionaries
                </div>
                <div className="px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm inline-flex items-center">
                  <Box className="w-3.5 h-3.5 mr-2" /> Creators
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="#team-grid"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Meet the Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/careers"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary/10 px-8 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/20"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Join Our Team
                </Link>
              </div>
            </motion.div>
            
            {/* Team preview grid removed */}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <p className="text-muted-foreground mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ArrowRight className="h-6 w-6 transform rotate-90 text-primary" />
          </motion.div>
        </div>
      </EnhancedSection>

      {/* Team Members Grid Layout */}
      <EnhancedSection 
        id="team-grid"
        className="py-20 relative"
        withGrain={true}
        grainOpacity={0.18}
        grainColor="rgba(125, 99, 205, 0.03)"
        backgroundGradient="bg-gradient-to-b from-[#121116]/0 via-purple-600/5 to-[#121116]/0"
      >
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 mb-4 text-xs md:text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Meet our talented team
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-text-shimmer"
            >
              The Minds Behind Our Success
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Our diverse team brings together expertise from leading tech companies and research institutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-primary to-purple-600 rounded-full"
            ></motion.div>
          </div>

          {/* Modern Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className="relative bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group h-full"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-background group-hover:border-primary/20 transition-all duration-300 mr-4">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                        <p className="text-primary/80 font-medium text-sm">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4 text-muted-foreground text-sm line-clamp-3">
                      {member.bio.substring(0, 100)}...
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-2xl">{member.emoji}</div>
                      <div className="flex space-x-2">
                        <Link href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </Link>
                        <Link href={member.social.github} className="text-muted-foreground hover:text-primary transition-colors">
                          <Github className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                      <span className="text-primary text-sm font-medium inline-flex items-center">
                        View Profile <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </EnhancedSection>

      {/* Team Values Section with 3D Cards */}
      <EnhancedSection 
        className="py-20 relative overflow-hidden"
        withGrain={true}
        grainOpacity={0.14}
        grainColor="rgba(200, 157, 74, 0.03)"
        backgroundGradient="bg-gradient-to-b from-[#121116]/0 via-[#c89d4a]/5 to-[#121116]/0"
      >
        <div className="container relative px-4 md:px-6 z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 mb-4 text-xs md:text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Our guiding principles
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-text-shimmer"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mt-2"
            >
              The principles that guide our team and shape our culture
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-primary to-purple-600 rounded-full"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                rotateY: 5,
                rotateX: -5,
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 p-8 transform perspective-1000 shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-md">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Innovation First</h3>
              <p className="text-muted-foreground">
                We push boundaries and challenge the status quo to create
                solutions that weren&apos;t possible before. We embrace
                experimentation and learn from both successes and failures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{
                rotateY: 5,
                rotateX: -5,
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 p-8 transform perspective-1000 shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-[#3b82f6] rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-md">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-[#3b82f6]">Human-Centered</h3>
              <p className="text-muted-foreground">
                We build AI that enhances human capabilities rather than
                replacing them, focusing on collaboration. Our technology exists
                to empower people and make their lives better.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{
                rotateY: 5,
                rotateX: -5,
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 p-8 transform perspective-1000 shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-md">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">Ethical AI</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to developing AI responsibly, with transparency
                and fairness at the core of everything we do. We consider the
                societal impact of our technology.
              </p>
            </motion.div>
          </div>
        </div>
      </EnhancedSection>

      {/* Join Our Team Section */}
      <EnhancedSection 
        className="py-20 relative overflow-hidden"
        withParticles={true}
        particleColor="rgba(82, 170, 173, 0.4)"
        lineColor="rgba(171, 81, 55, 0.2)"
        backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#3b82f6]/5 to-[#121116]/0"
        grainColor="rgba(59, 130, 246, 0.03)"
        grainOpacity={0.15}
      >
        <div className="container relative px-4 md:px-6 z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 mb-4 text-xs md:text-sm font-medium rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Join our mission
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-text-shimmer"
            >
              Become Part of Our Team
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-primary to-purple-600 rounded-full"
            ></motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600 opacity-50"></div>
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                      Join Our Team
                    </h3>
                    <p className="text-muted-foreground mb-6 text-lg">
                      We&apos;re always looking for talented individuals who are
                      passionate about AI and innovation. Join us in building
                      the future of work.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                        <span className="mr-2">🌟</span> Competitive Salary
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                        <span className="mr-2">🏥</span> Health Benefits
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                        <span className="mr-2">🌴</span> Flexible PTO
                      </div>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                        <span className="mr-2">🚀</span> Growth Opportunities
                      </div>
                    </div>
                    <Link
                      href="/careers"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                      View Open Positions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="md:col-span-4 relative">
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/30 to-purple-600/30 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
                      <div className="relative bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 shadow-lg overflow-hidden h-full flex items-center justify-center">
                        <div className="text-8xl animate-float">🚀</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </EnhancedSection>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-primary/20"
          >
            <div className="relative">
              <div
                className={`h-40 bg-gradient-to-r ${selectedMember.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-card/90 to-transparent"></div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors duration-200 border border-primary/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative px-8 pb-8">
                <div className="relative -mt-20 mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background/80 shadow-xl mx-auto group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={selectedMember.image || "/placeholder.svg"}
                      alt={selectedMember.name}
                      width={128}
                      height={128}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-text-shimmer">
                    {selectedMember.name}
                  </h2>
                  <p className="text-primary/80 font-medium">
                    {selectedMember.role}
                  </p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <Link
                      href={selectedMember.social.linkedin}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href={selectedMember.social.github}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`mailto:${selectedMember.social.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 inline-flex items-center">
                      <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <span className="text-primary text-sm">01</span>
                      </span>
                      About
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {selectedMember.bio}
                    </p>

                    <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 mb-6 border border-primary/10 shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="text-sm font-medium text-primary/80 mb-2">
                        Fun Fact
                      </div>
                      <div className="flex items-center">
                        <span className="text-3xl mr-3 animate-float">
                          {selectedMember.emoji}
                        </span>
                        <span className="text-muted-foreground">{selectedMember.funFact}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 mb-6 border border-primary/10 shadow-lg hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-purple-600/50"></div>
                      <div className="text-4xl text-primary/20 mb-4">&quot;</div>
                      <p className="text-lg italic mb-4 text-muted-foreground">
                        {selectedMember.quote}
                      </p>
                      <div className="text-right text-4xl text-primary/20">&quot;</div>
                    </div>

                    <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <h3 className="text-lg font-bold mb-3 inline-flex items-center">
                        <span className="bg-primary/10 w-7 h-7 rounded-full flex items-center justify-center mr-2">
                          <Mail className="h-3.5 w-3.5 text-primary" />
                        </span>
                        Contact
                      </h3>
                      <p className="text-primary/80 font-medium">
                        {selectedMember.social.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <footer className="relative z-10 bg-background/80 backdrop-blur-md">
        <EnhancedSection 
          className="py-12"
          withParticles={true}
          particleColor="rgba(82, 170, 173, 0.3)"
          lineColor="rgba(171, 81, 55, 0.15)"
          backgroundGradient="bg-gradient-to-tr from-[#121116]/0 via-[#3b82f6]/5 to-[#121116]/10"
          grainColor="rgba(82, 170, 173, 0.03)"
          grainOpacity={0.12}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </EnhancedSection>
      </footer>
      {/* Enhanced scroll to top button with glow effect */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="#top" 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/80 text-white shadow-lg hover:bg-primary transition-all duration-300 backdrop-blur-sm hover:shadow-primary/30 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </a>
      </div>
    </main>
  );
}
