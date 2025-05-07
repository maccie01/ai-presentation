"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR for the client content
const MemoryPromptsClientContent = dynamic(
  () => import('@/components/examples/MemoryPromptsClientContent'),
  { ssr: false }
);

export default function MemoryPromptsWrapper() {
  return (
    <MemoryPromptsClientContent 
      title="Memory-Prompts und Memory Bank"
      subtitle="Implementierung von Gedächtnisfunktionen für KI-Systeme"
    />
  );
} 