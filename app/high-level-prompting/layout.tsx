import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High-Level Prompting | AI Presentation',
  description: 'Lernen Sie fortgeschrittene Prompting-Techniken für KI-Modelle',
};

export default function HighLevelPromptingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 