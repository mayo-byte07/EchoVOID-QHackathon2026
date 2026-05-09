'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Github, Linkedin, Twitter, Mail, Code, Cpu, Sigma, Radio } from 'lucide-react';

const team = [
  {
    name: "Piyush Singh",
    role: "Web And App Devloper",
    icon: <Cpu className="text-red-500" />,
    bio: "Specializes in real-time Web And App Devloper and UI/UX of the project.",
    skills: ["React", "Next.js", "CSS"],
    color: "from-red-500/20 to-transparent"
  },
  {
    name: "Swapnil Kumar",
    role: "Hardware Architect and IOT Developer",
    icon: <Radio className="text-orange-500" />,
    bio: "Designed the IOT based Hardware and power management systems.",
    skills: ["PCB Design", "I2S", "CAD"],
    color: "from-orange-500/20 to-transparent"
  },
  {
    name: "Viraj Kumar",
    role: "Database developement",
    icon: <Sigma className="text-amber-500" />,
    bio: "The brain behind the Database and AI development of the project.",
    skills: ["Python", "AI", "Database"],
    color: "from-amber-500/20 to-transparent"
  },
  {
    name: "Adarsh Kumar",
    role: "Testing and deployment",
    icon: <Code className="text-blue-500" />,
    bio: "Built the Next.js Command Center and real-time telemetry visualization.",
    skills: ["Testing", "Deployment"],
    color: "from-blue-500/20 to-transparent"
  }
];

export default function TeamPage() {
  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors mb-4">
              <ChevronLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-5xl font-black tracking-tighter uppercase">The Collaborators</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest mt-2">Echo Void Project Core Team</p>
          </div>
          <div className="flex -space-x-4">
            {team.map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-[#030712] bg-gray-800 flex items-center justify-center font-bold text-xs">
                T{i + 1}
              </div>
            ))}
          </div>
        </header>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${member.color} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 h-full flex flex-col backdrop-blur-sm hover:border-gray-700 transition-all">
                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  {member.icon}
                </div>

                <h3 className="text-2xl font-black tracking-tight mb-1">{member.name}</h3>
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {member.skills.map((skill, si) => (
                    <span key={si} className="text-[10px] font-black px-2 py-1 bg-white/5 border border-white/10 rounded-md uppercase tracking-tighter">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 border-t border-gray-800 pt-6">
                  <Github size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                  <Linkedin size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                  <Twitter size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                  <Mail size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Section: Project Status */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 bg-gray-900/20 border border-gray-800 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Radio size={200} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">Project Status: Phase 1 Finalized</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Hardware Rev", val: "v1.1" },
                { label: "DSP Load", val: "42%" },
                { label: "Nodes Active", val: "04" },
                { label: "Log Count", val: "1,248" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-2xl font-black text-red-500">{stat.val}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
