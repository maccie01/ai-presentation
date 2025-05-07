"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR for the client content
const AutomotiveBeispieleClientContent = dynamic(
  () => import('@/components/examples/AutomotiveBeispieleClientContent'),
  { ssr: false }
);

export default function AutomotiveBeispieleWrapper() {
  return (
    <AutomotiveBeispieleClientContent 
      title="Branchen-spezifische Automotive-Beispiele"
      subtitle="Anwendungsfälle und Beispiele für KI im Automobilbereich"
    />
  );
} 