'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, LayoutDashboard, Radio, Activity, Map as MapIcon, 
  History, Settings, Shield, Zap, Terminal, Maximize2 
} from 'lucide-react';
import TelemetryFeed from '@/components/dashboard/TelemetryFeed';
import GhostLog from '@/components/dashboard/GhostLog';
import AcousticFingerprint from '@/components/dashboard/AcousticFingerprint';
import { useSensorStore } from '@/store/useSensorStore';

// Dynamic imports
const SpatialRadar = dynamic(() => import('@/components/radar/SpatialRadar'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-900 animate-pulse rounded-full" />,
});

const RescueMap = dynamic(() => import('@/components/maps/RescueMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-900 animate-pulse rounded-2xl" />,
});

type Tab = 'overview' | 'acoustic' | 'geospatial' | 'logs' | 'settings';

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const simulate = useSensorStore(state => state.simulate);

  useEffect(() => {
    const cleanup = simulate();
    return cleanup;
  }, [simulate]);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'acoustic', label: 'Acoustic Lab', icon: <Activity size={20} /> },
    { id: 'geospatial', label: 'Geospatial', icon: <MapIcon size={20} /> },
    { id: 'logs', label: 'Event Logs', icon: <History size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#030712] text-gray-100 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-gray-800/50 bg-gray-950/40 backdrop-blur-xl flex flex-col z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 mb-10 group">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
              <Radio size={18} className="text-white" />
            </div>
            <span className="font-black tracking-tighter text-xl">ECHO VOID</span>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === item.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' 
                    : 'text-gray-500 hover:bg-gray-900 hover:text-gray-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Node Active</span>
            </div>
            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">ID: AE-01-DELTA</div>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs font-black text-gray-600 hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            <ChevronLeft size={14} /> Exit Center
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow relative overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-md border-b border-gray-800/50 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">
              {activeTab === 'overview' ? 'Real-Time Telemetry' : `System // ${activeTab.toUpperCase()}`}
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-black">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 rounded-full border border-gray-800">
              <Shield size={12} className="text-red-500" />
              <span>SECURE ACCESS</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 rounded-full border border-gray-800 text-gray-400">
              <Zap size={12} className="text-amber-500" />
              <span>DSP LOAD: 42%</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Big Radar Card */}
                  <div className="lg:col-span-2 bg-gray-900/40 border border-gray-800 rounded-[2.5rem] h-[500px] overflow-hidden relative group">
                    <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/5 rounded-full">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                      <span className="text-[9px] font-bold tracking-widest uppercase italic">Live Spatial Triangulation</span>
                    </div>
                    <SpatialRadar />
                  </div>
                  
                  {/* Telemetry Column */}
                  <div className="space-y-8">
                    <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                        <Activity size={14} className="text-red-500" /> Sensor Health
                      </h3>
                      <TelemetryFeed />
                    </div>
                    <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 h-64 overflow-hidden">
                      <AcousticFingerprint />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Recent Events</h3>
                  <GhostLog />
                </div>
              </motion.div>
            )}

            {activeTab === 'acoustic' && (
              <motion.div
                key="acoustic"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-8">
                  <div className="bg-gray-900/40 border border-gray-800 rounded-[3rem] p-12 h-[600px]">
                    <div className="h-full">
                      <AcousticFingerprint />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {['MVDR Beamforming', 'Phase Shift Log', 'Harmonic Analysis'].map((tool, i) => (
                      <div key={i} className="p-8 bg-gray-900/40 border border-gray-800 rounded-3xl">
                        <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">Module {i+1}</div>
                        <h4 className="text-xl font-bold uppercase italic">{tool}</h4>
                        <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${30 + (i * 20)}%` }}
                            className="h-full bg-red-600" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'geospatial' && (
              <motion.div
                key="geospatial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[calc(100vh-180px)]"
              >
                <div className="h-full bg-gray-900/40 border border-gray-800 rounded-[3rem] overflow-hidden relative group">
                  <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center gap-3">
                    <MapIcon size={16} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tactical Map Layer</span>
                  </div>
                  <RescueMap />
                </div>
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/40 border border-gray-800 rounded-[3rem] p-12 min-h-screen"
              >
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black uppercase tracking-tight italic">Historic Ghost Log</h3>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                    <Maximize2 size={14} /> Export CSV
                  </button>
                </div>
                <GhostLog />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl"
              >
                <div className="space-y-8">
                  <div className="p-8 bg-gray-900/40 border border-gray-800 rounded-[2rem]">
                    <h4 className="font-black uppercase tracking-widest text-gray-500 text-xs mb-6">Node Configuration</h4>
                    <div className="space-y-6">
                      {[
                        { label: 'Sampling Rate', val: '48kHz' },
                        { label: 'Sensitivity', val: '-26 dBFS' },
                        { label: 'Null Steering Power', val: 'Adaptive' },
                        { label: 'Telemetry Interval', val: '2.0s' }
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-800 last:border-0">
                          <span className="text-sm font-bold text-gray-400">{s.label}</span>
                          <span className="text-sm font-black text-white">{s.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 bg-red-950/10 border border-red-900/20 rounded-[2rem]">
                    <h4 className="font-black uppercase tracking-widest text-red-500 text-xs mb-6">Danger Zone</h4>
                    <button className="w-full py-4 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-500 rounded-2xl font-black uppercase text-xs transition-all">
                      Re-Initialize Acoustic Node
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #030712;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #374151;
        }
      `}</style>
    </div>
  );
}
