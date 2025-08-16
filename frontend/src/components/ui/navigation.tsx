import Link from 'next/link';
import { Button } from '@/components/ui/button';on } from '@/components/ui/button';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/my-tickets', label: 'My Tickets' },
];

export function Navigation() {
  return (
    <nav className="w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            Event Platform
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
