import React from 'react';

export default function AutomotiveBeispieleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen">
      {children}
    </section>
  );
} 