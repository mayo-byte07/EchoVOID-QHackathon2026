'use client';

import React from 'react';
import { useSensorStore } from '@/store/useSensorStore';

// Placeholder component – in a full app this would query Supabase for historic events.
export default function GhostLog() {
  const x = useSensorStore(state => state.x);
  const y = useSensorStore(state => state.y);
  const z = useSensorStore(state => state.z);
  const confidence = useSensorStore(state => state.confidence);

  return (
    <table className="w-full table-auto text-sm text-left">
      <thead className="border-b border-gray-700">
        <tr className="text-gray-300">
          <th className="p-2">X</th>
          <th className="p-2">Y</th>
          <th className="p-2">Z</th>
          <th className="p-2">Confidence</th>
        </tr>
      </thead>
      <tbody className="text-gray-200">
        <tr className="border-b border-gray-800">
          <td className="p-2">{x.toFixed(2)}</td>
          <td className="p-2">{y.toFixed(2)}</td>
          <td className="p-2">{z.toFixed(2)}</td>
          <td className="p-2">{confidence}%</td>
        </tr>
      </tbody>
    </table>
  );
}
