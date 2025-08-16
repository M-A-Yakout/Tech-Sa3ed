'use client';

import dynamic from 'next/dynamic';

const EventList = dynamic(() => import('@/components/EventList'), { ssr: false });

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">All Events</h1>
      <EventList />
    </main>
  );
}
