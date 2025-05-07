import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontextwahl | AI Presentation',
  description: 'Optimale Strategien für die Auswahl und Nutzung von Kontext in KI-Anfragen',
};

export default function KontextwahlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 