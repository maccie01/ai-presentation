"use client";

import Link from 'next/link';
import PButton from '@/components/ui/PButton';
import PHeading from '@/components/ui/PHeading';
import PText from '@/components/ui/PText';
import { PGrid, PGridItem } from '@/components/ui/PGrid';
import EmbeddedPresentation from '@/components/interactive/EmbeddedPresentation';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-8">
      <PHeading tag="h1" size="xx-large" className="mb-6">
        Künstliche Intelligenz
      </PHeading>
      
      <PHeading tag="h2" size="x-large" className="mb-8">
        Konzepte, Anwendungen und Best Practices
      </PHeading>
      
      <PText size="large" className="max-w-3xl mb-12">
        Eine interaktive Präsentation über künstliche Intelligenz mit besonderem Fokus 
        auf Anwendungen in der Automobilindustrie.
      </PText>
      
      <div className="max-w-4xl w-full mb-12">
        <EmbeddedPresentation presentationId="Yjr8Lr" height="525px" />
      </div>
      
      <PGrid className="max-w-4xl w-full">
        <PGridItem size={12} className="p-2 flex justify-center gap-4">
          <Link href="/ki-uberblick" style={{ textDecoration: 'none' }}>
            <PButton variant="secondary" className="px-6">
              Explore Content
            </PButton>
          </Link>
          
          <a href="https://github.com/your-username/ai-presentation" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <PButton variant="secondary" className="px-6">
              GitHub Repository
            </PButton>
          </a>
        </PGridItem>
      </PGrid>
    </div>
  );
}
