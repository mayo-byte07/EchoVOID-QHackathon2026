'use client';

import React from 'react';
import { useSensorStore } from '@/store/useSensorStore';

export default function TelemetryFeed() {
  const confidence = useSensorStore(state => state.confidence);
  const dspLoad = useSensorStore(state => state.dspLoad);

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="font-medium">Confidence</span>
        <span>{confidence}%</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">DSP Load</span>
        <span>{dspLoad}%</span>
      </div>
    </div>
  );
}
