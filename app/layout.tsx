import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import MainLayout from '@/components/layout/MainLayout';
import PorscheDesignProvider from '@/components/layout/PorscheDesignProvider';
import ClientOnly from '@/components/utils/ClientOnly';
import DynamicPromptBuilderWrapper from '@/components/providers/DynamicPromptBuilderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Presentation - Home',
  description: 'Interactive presentation on AI concepts for the automotive industry',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PorscheDesignProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <NavigationBar />
            <MainLayout>
              {children}
            </MainLayout>
            <Footer />
            <ClientOnly>
              <DynamicPromptBuilderWrapper />
            </ClientOnly>
          </div>
        </PorscheDesignProvider>
      </body>
    </html>
  );
}
