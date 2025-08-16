'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, Mountain, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/my-tickets', label: 'My Tickets' },
];

export function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-opacity-90 backdrop-blur-md bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Event Platform
            </span>
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
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-300">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-gray-900/95 backdrop-blur-md border-gray-800">
              <SheetTitle>Menu</SheetTitle>
              <nav className="mt-6 flex flex-col space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
