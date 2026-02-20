import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mission Control',
  description: 'Dashboard em tempo real do ecossistema de agentes',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Providers>
          <Sidebar />
          {/* Main content wrapper - no sidebar on mobile, sidebar visible on lg */}
          <div className="lg:pl-64">
            <Header />
            <main className="p-4 md:p-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
