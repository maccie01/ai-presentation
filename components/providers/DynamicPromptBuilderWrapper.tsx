'use client';

import dynamic from 'next/dynamic';

// Import the PromptBuilderProvider with dynamic import to avoid SSR issues
const PromptBuilderProvider = dynamic(
  () => import('@/components/providers/PromptBuilderProvider'),
  { ssr: false }
);

export default function DynamicPromptBuilderWrapper() {
  return <PromptBuilderProvider />;
} 