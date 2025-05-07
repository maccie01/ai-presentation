'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MicrosoftKIRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the new path
    router.replace('/power-platform');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-gray-600">Redirecting to Microsoft Office KI-Produkte...</p>
    </div>
  );
} 