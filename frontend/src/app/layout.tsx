import './globals.css';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { UserProvider } from '../contexts/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Event Ticketing Platform',
  description: 'Buy tickets for amazing events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserProvider>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
              <Navigation />
              <main className="container mx-auto px-4 pt-20 min-h-screen">
                {children}
              </main>
              <footer className="py-6 bg-slate-950/80">
                <div className="container mx-auto px-4">
                  <p className="text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} Event Platform. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}


