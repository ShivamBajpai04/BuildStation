"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Image from "next/image";
import { Linkedin, Twitter, Mail, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { ThemeEffect } from "@/components/theme-effect";
import { motion } from "framer-motion";

// Define the TeamMember type to fix type errors
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin: string;
    twitter: string;
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
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Sarah has over 15 years of experience in AI and machine learning. Previously, she led AI initiatives at Google and has a PhD in Computer Science from Stanford.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@example.com",
      },
      funFact: "Can solve a Rubik&apos;s cube in under a minute",
      quote:
        "AI isn&apos;t just about automation—it&apos;s about augmenting human potential.",
      department: "leadership",
      color: "from-blue-500 to-purple-500",
      emoji: "✨",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Michael is a former senior engineer at Microsoft with expertise in cloud infrastructure and AI systems. He holds an MS in Computer Engineering from MIT.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael@example.com",
      },
      funFact: "Builds custom mechanical keyboards as a hobby",
      quote:
        "The best code is no code at all. The second best is code that&apos;s so clear it speaks for itself.",
      department: "leadership",
      color: "from-green-500 to-teal-500",
      emoji: "🚀",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Emily brings 10 years of product management experience from Amazon. She&apos;s passionate about creating intuitive user experiences powered by AI.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@example.com",
      },
      funFact: "Former competitive chess player",
      quote:
        "Great products don&apos;t just solve problems—they create possibilities.",
      department: "product",
      color: "from-orange-500 to-red-500",
      emoji: "♟️",
    },
    {
      name: "David Kim",
      role: "Lead AI Engineer",
      bio: "David specializes in natural language processing and machine learning algorithms. He previously worked at OpenAI and has published numerous research papers.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@example.com",
      },
      funFact: "Speaks five languages fluently",
      quote:
        "The future of AI is not just smarter machines, but more empathetic ones.",
      department: "engineering",
      color: "from-purple-500 to-indigo-500",
      emoji: "🤖",
    },
    {
      name: "Priya Patel",
      role: "Head of Customer Success",
      bio: "Priya ensures our customers get the most value from our platform. With a background in customer experience at Salesforce, she&apos;s dedicated to client satisfaction.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "priya@example.com",
      },
      funFact: "Certified yoga instructor",
      quote:
        "Customer success is about building relationships, not just solving tickets.",
      department: "customer",
      color: "from-pink-500 to-rose-500",
      emoji: "🧘‍♀️",
    },
    {
      name: "James Wilson",
      role: "VP of Sales",
      bio: "James has a proven track record of scaling B2B SaaS companies. He previously led sales teams at HubSpot and Zoom, driving significant revenue growth.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james@example.com",
      },
      funFact: "Former professional basketball player",
      quote:
        "Sales isn&apos;t about convincing—it&apos;s about connecting the right solutions to the right problems.",
      department: "sales",
      color: "from-yellow-500 to-amber-500",
      emoji: "🏀",
    },
    {
      name: "Sophia Martinez",
      role: "Head of Marketing",
      bio: "Sophia is a strategic marketer with experience at leading tech companies. She specializes in product marketing, brand strategy, and growth marketing.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sophia@example.com",
      },
      funFact: "Published novelist in her spare time",
      quote: "Great marketing tells a story that people want to be part of.",
      department: "marketing",
      color: "from-cyan-500 to-blue-500",
      emoji: "📚",
    },
    {
      name: "Alex Thompson",
      role: "UX/UI Design Lead",
      bio: "Alex leads our design team with a focus on creating beautiful, intuitive interfaces. He previously designed products at Airbnb and Figma.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "alex@example.com",
      },
      funFact: "Collects vintage movie posters",
      quote: "Design is not just what it looks like. Design is how it works.",
      department: "design",
      color: "from-violet-500 to-purple-500",
      emoji: "🎨",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      <ThemeEffect />

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0,rgba(var(--background),1)_70%)]"></div>

        

        <div className="container relative px-4 md:px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              We&apos;re not just building AI—we&apos;re building the future of work. Meet
              the diverse team of experts making it happen.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium">
                Innovators
              </div>
              <div className="px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium">
                Problem Solvers
              </div>
              <div className="px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium">
                Visionaries
              </div>
              <div className="px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium">
                Creators
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <p className="text-muted-foreground mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ArrowRight className="h-6 w-6 transform rotate-90 text-primary" />
          </motion.div>
        </div>
      </section>

      {/* Hexagonal Grid Team Layout */}
      <section className="py-20 relative">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight md:text-5xl"
            >
              The Minds Behind Our Success
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-primary to-purple-600 rounded-full"
            ></motion.div>
          </div>

          {/* Hexagonal Grid */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
                style={{ marginTop: index % 2 === 0 ? "0" : "60px" }}
              >
                <div
                  className="relative w-64 h-72 cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => setSelectedMember(member)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-2xl transform rotate-45 opacity-20`}
                  ></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-background">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium text-sm">
                      {member.role}
                    </p>
                    <div className="mt-2 text-3xl">{member.emoji}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section with 3D Cards */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.15),transparent_70%)]"></div>
        </div>
        <div className="container relative px-4 md:px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide our team and shape our culture
            </p>
          </motion.div>

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
              className="bg-card rounded-2xl overflow-hidden border border-primary/20 p-8 transform perspective-1000"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4">Innovation First</h3>
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
              className="bg-card rounded-2xl overflow-hidden border border-primary/20 p-8 transform perspective-1000"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4">Human-Centered</h3>
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
              className="bg-card rounded-2xl overflow-hidden border border-primary/20 p-8 transform perspective-1000"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4">Ethical AI</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to developing AI responsibly, with transparency
                and fairness at the core of everything we do. We consider the
                societal impact of our technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(var(--primary),0.15)_0deg,transparent_60deg,transparent_300deg,rgba(var(--primary),0.15)_360deg)]"></div>
        </div>
        <div className="container relative px-4 md:px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Join Our Team
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      We&apos;re always looking for talented individuals who are
                      passionate about AI and innovation. Join us in building
                      the future of work.
                    </p>
                    <Link
                      href="/careers"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                      View Open Positions
                    </Link>
                  </div>
                  <div className="w-full md:w-1/3 aspect-square relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-2xl opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl">🚀</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <div
                className={`h-40 bg-gradient-to-r ${selectedMember.color}`}
              ></div>
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative px-8 pb-8">
                <div className="relative -mt-20 mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background mx-auto">
                    <Image
                      src={selectedMember.image || "/placeholder.svg"}
                      alt={selectedMember.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-1">
                    {selectedMember.name}
                  </h2>
                  <p className="text-primary font-medium">
                    {selectedMember.role}
                  </p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <Link
                      href={selectedMember.social.linkedin}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href={selectedMember.social.twitter}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`mailto:${selectedMember.social.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">About</h3>
                    <p className="text-muted-foreground mb-6">
                      {selectedMember.bio}
                    </p>

                    <div className="bg-muted/30 rounded-xl p-4 mb-6">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Fun Fact
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">
                          {selectedMember.emoji}
                        </span>
                        <span>{selectedMember.funFact}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-primary/5 rounded-xl p-6 mb-6">
                      <div className="text-4xl mb-4">&quot;</div>
                      <p className="text-lg italic mb-4">
                        {selectedMember.quote}
                      </p>
                      <div className="text-right text-4xl">&quot;</div>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4">
                      <h3 className="text-lg font-bold mb-2">Contact</h3>
                      <p className="text-muted-foreground">
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

      <Footer />
    </main>
  );
}
