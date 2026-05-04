import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SensorState {
  x: number;
  y: number;
  z: number;
  confidence: number; // 0-100
  dspLoad: number; // %
  simulate: () => () => void; // Returns cleanup function
  setData: (data: Partial<Omit<SensorState, 'simulate' | 'setData'>>) => void;
}

export const useSensorStore = create<SensorState>()(
  devtools(set => ({
    x: 0,
    y: 0,
    z: 0,
    confidence: 0,
    dspLoad: 0,
    simulate: () => {
      // Generate random demo data every 2 seconds
      const interval = setInterval(() => {
        const data = {
          x: parseFloat((Math.random() * 2 - 1).toFixed(2)),
          y: parseFloat((Math.random() * 2 - 1).toFixed(2)),
          z: parseFloat((Math.random() * 2 - 1).toFixed(2)),
          confidence: Math.floor(Math.random() * 101),
          dspLoad: Math.floor(Math.random() * 101),
        };
        set(state => ({ ...state, ...data }));
      }, 2000);
      
      return () => clearInterval(interval);
    },
    setData: data => set(state => ({ ...state, ...data })),
  }))
);
