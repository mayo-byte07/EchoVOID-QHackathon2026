'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { 
  Activity, Shield, Zap, Radio, ChevronRight, Cpu, Layers, 
  Target, Mic2, Waves, Terminal, Info, AlertTriangle, Search, HeartPulse
} from 'lucide-react';
import dynamic from 'next/dynamic';

const SpatialRadar = dynamic(() => import('@/components/radar/SpatialRadar'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-900 animate-pulse rounded-full" />,
});

const AcousticFingerprint = dynamic(() => import('@/components/dashboard/AcousticFingerprint'), {
  ssr: false,
});

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="bg-[#030712] text-gray-100 overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[100] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[60] bg-gray-950/50 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-2xl shadow-red-500/40 rotate-3">
              <Radio size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter leading-none">ECHO VOID</span>
              <span className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase">Acoustic Rescue</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">How it Works</Link>
            <Link href="#technology" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Technology</Link>
            <Link href="/team" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Team</Link>
            <Link 
              href="/dashboard"
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 flex items-center gap-2"
            >
              Command Center <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black mb-8 tracking-[0.3em] uppercase shadow-lg">
              <Zap size={14} /> Mission Critical // Node Active
            </div>
            <h1 className="text-7xl lg:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
              SILENCE THE <br />
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent italic">
                CHAOS.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-medium">
              ECHO VOID is an inverted acoustic sensor array designed to cancel environmental noise—generators, engines, heavy machinery—using <span className="text-white border-b border-red-500">mathematical null steering</span> to find lives where traditional audio fails.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                href="/dashboard"
                className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-[2rem] font-black transition-all flex items-center gap-3 text-lg shadow-2xl shadow-white/10"
              >
                Launch Dashboard <ChevronRight />
              </Link>
              <button className="px-10 py-5 bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-[2rem] font-black transition-all text-lg group">
                <span className="group-hover:text-red-500 transition-colors tracking-tight uppercase italic text-sm">Read Whitepaper</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="w-full aspect-square max-w-xl mx-auto relative group">
              <div className="absolute inset-0 bg-red-600/20 rounded-full blur-[120px] group-hover:bg-red-600/30 transition-all duration-1000" />
              <div className="relative z-10 w-full h-full border border-white/5 rounded-[3rem] p-12 bg-gray-950/40 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <SpatialRadar />
                
                {/* Tactical HUD Overlays */}
                <div className="absolute top-8 left-8 flex flex-col gap-1">
                  <div className="text-[9px] font-black text-red-500 tracking-widest uppercase">System Status</div>
                  <div className="text-xs font-bold text-white uppercase tracking-tighter">Scanning Spatial Sphere...</div>
                </div>
                <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 text-right">
                  <div className="text-[9px] font-black text-gray-500 tracking-widest uppercase">Coordinate Lock</div>
                  <div className="text-xs font-bold text-white uppercase tracking-tighter">θ: 142.4° | φ: 28.1°</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-900 bg-gray-950/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Processing Latency", val: "< 2ms", icon: <Zap size={16} /> },
            { label: "Noise Reduction", val: "-42dB", icon: <Waves size={16} /> },
            { label: "Angular Precision", val: "± 2.5°", icon: <Target size={16} /> },
            { label: "Nodes Deployable", val: "∞", icon: <Layers size={16} /> }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex justify-center mb-4 text-red-500 opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
              <div className="text-4xl font-black mb-1 text-white tracking-tighter">{stat.val}</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-8"
          >
            <h2 className="text-5xl font-black tracking-tight leading-tight uppercase">
              The Rescue <br />
              <span className="text-red-600">Paradox</span>
            </h2>
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed text-lg italic">
                "In disaster zones, the very machines used for rescue—excavators, generators, helicopter engines—create a wall of sound that masks the victims they seek."
              </p>
              <div className="p-6 bg-red-950/20 border border-red-900/30 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-red-500 font-bold text-sm uppercase tracking-widest">
                  <AlertTriangle size={18} /> The Wall of Sound
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Standard microphones amplify everything. If a generator is 100x louder than a voice, amplification just makes the generator even more deafening.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative bg-gray-900/40 border border-gray-800 rounded-[3rem] p-10 h-96 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <AcousticFingerprint />
            </div>
            <div className="relative z-10 flex flex-col justify-end h-full">
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Null Steering Solution</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                By calculating the phase difference between 4 digital microphones in a tetrahedral geometry, ECHO VOID mathematically subtracts specific frequencies from specific directions, "carving a hole" through the noise.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Breakdown */}
      <section id="technology" className="py-32 px-6 bg-gray-950/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tight italic">Tactical Architecture</h2>
            <p className="text-gray-400 font-medium">Built with mission-critical components for low latency and high-performance spatial triangulation.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "ESP32 Dual-Core",
                icon: <Cpu />,
                desc: "Dedicated Core 1 for real-time DSP, Core 0 for secure telemetry ingress and Supabase integration.",
                tech: ["RTOS", "Dual-Core", "160MHz"]
              },
              {
                title: "Tetrahedral Array",
                icon: <Mic2 />,
                desc: "Four INMP441 digital MEMS microphones arranged in a 3D pyramid for complete spatial coverage.",
                tech: ["I2S Digital", "High SNR", "Omnidirectional"]
              },
              {
                title: "MVDR Beamforming",
                icon: <Waves />,
                desc: "Minimum Variance Distortionless Response algorithm isolates distress signals from stationary noise sources.",
                tech: ["FFT", "Phase Shift", "Geometric Math"]
              },
              {
                title: "Supabase Backend",
                icon: <Terminal />,
                desc: "Real-time event logging and historical 'Ghost Log' persistence for post-rescue analysis.",
                tech: ["PostgreSQL", "Real-time Sub", "Webhooks"]
              },
              {
                title: "MapLibre Geospatial",
                icon: <Search />,
                desc: "Vector mapping for pinpointing node location and DOA vector overlays on interactive terrain.",
                tech: ["WebGL", "OpenStreetMap", "Terrain Data"]
              },
              {
                title: "Next.js Interface",
                icon: <Activity />,
                desc: "PremiumCommand Center dashboard with Three.js radar and Framer Motion interactive UI.",
                tech: ["React 19", "Three.js", "Tailwind 4"]
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-10 bg-gray-900/40 border border-gray-800 rounded-[2.5rem] hover:border-red-500/30 transition-all group"
              >
                <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t, ti) => (
                    <span key={ti} className="text-[9px] font-black px-2 py-1 bg-white/5 border border-white/10 rounded-lg uppercase tracking-tighter text-gray-500">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] bg-red-600/5 rounded-[4rem] border border-red-500/10 overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-[3000ms]" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
               <div className="absolute bottom-12 left-12 right-12 space-y-4">
                 <div className="px-4 py-1 bg-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] inline-block mb-4">Case Study 01</div>
                 <h3 className="text-4xl font-black uppercase tracking-tight italic text-white">Urban Search & Rescue</h3>
                 <p className="text-gray-300 text-sm leading-relaxed">
                   Deployment in collapsed structures where heavy machinery is actively clearing debris. ECHO VOID filters out the excavators to hear tapping or vocal distress.
                 </p>
               </div>
            </div>

            <div className="space-y-12">
               {[
                 { 
                   icon: <HeartPulse className="text-blue-500" />, 
                   title: "Industrial Safety", 
                   desc: "Monitoring high-noise manufacturing floors for specific acoustic failure patterns or worker distress calls.",
                   color: "blue" 
                 },
                 { 
                   icon: <Info className="text-amber-500" />, 
                   title: "Wilderness Rescue", 
                   desc: "Filtering wind and rain noise on mountain slopes to locate SOS whistles or shouts over large distances.",
                   color: "amber" 
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex gap-8 group"
                 >
                   <div className={`w-16 h-16 shrink-0 bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-[2rem] flex items-center justify-center`}>
                     {item.icon}
                   </div>
                   <div className="space-y-3">
                     <h4 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h4>
                     <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 </motion.div>
               ))}
               
               <div className="pt-8">
                 <Link href="/team" className="inline-flex items-center gap-3 text-red-500 font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                   Meet the engineers behind it <ChevronRight size={18} />
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 blur-[150px] rounded-full translate-y-1/2" />
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-6xl lg:text-8xl font-black mb-12 tracking-tighter italic">READY TO <br /> LISTEN?</h2>
          <Link 
            href="/dashboard"
            className="px-16 py-8 bg-red-600 hover:bg-red-500 text-white rounded-[3rem] font-black text-2xl uppercase tracking-tighter transition-all shadow-[0_0_50px_rgba(220,38,38,0.4)] inline-flex items-center gap-4 group"
          >
            Enter Command Center <Activity className="group-hover:animate-ping" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-900 px-6 bg-gray-950/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Radio size={20} className="text-red-500" />
              <span className="font-black text-xl tracking-tighter uppercase">ECHO VOID</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Revolutionizing search and rescue through advanced geometric acoustics and signal subtraction.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Navigation</div>
            <ul className="space-y-2 text-sm font-bold text-gray-500">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hardware BOM</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</div>
            <ul className="space-y-2 text-sm font-bold text-gray-500">
              <li><a href="mailto:info@echovoid.ai" className="hover:text-white transition-colors">info@echovoid.ai</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Discord Community</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Newsletter</div>
            <div className="flex gap-2">
              <input type="text" placeholder="Email" className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-xs font-bold w-full focus:outline-none focus:border-red-500 transition-colors" />
              <button className="bg-white text-black p-2 rounded-xl"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">
          <span>&copy; 2026 ECHO VOID SYSTEMS. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
