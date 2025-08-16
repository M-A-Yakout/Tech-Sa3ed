'use client';

import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';

const EventList = dynamic(
  () => import('@/components/EventList').then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        <EventList />
      </section>
    </main>
  );
}
