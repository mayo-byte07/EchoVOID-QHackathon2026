'use client';

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

export default function RescueMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
    const style = key 
      ? `https://api.maptiler.com/maps/streets/style.json?key=${key}`
      : 'https://demotiles.maplibre.org/style.json'; // Fallback open-source style

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: style,
      center: [0, 0], // placeholder GPS
      zoom: 2,
    });
    // Add a marker for the sensor location (fixed at 0,0 for demo)
    new maplibregl.Marker({ color: '#ff4757' }).setLngLat([0, 0]).addTo(map);
    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="h-full w-full rounded-lg" />;
}
