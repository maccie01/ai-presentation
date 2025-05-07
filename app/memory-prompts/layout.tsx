import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memory-Prompts und Memory Bank | AI Presentation',
  description: 'Konzepte und Implementierungen für Gedächtnis-Funktionen in KI-Anwendungen',
};

export default function MemoryPromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 