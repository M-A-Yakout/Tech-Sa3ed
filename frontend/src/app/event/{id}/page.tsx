'use client';

import Link from 'next/link';
import Image from 'next/image';
import api from '../../lib/api';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import CheckoutButton from '@/components/CheckoutButton';
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  image?: string; // Added for potential event image
  created_by: {
    username: string;
    avatar?: string;
  };
}

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    api.get(`/events/${id}/`)
      .then(res => {
        setEvent(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading event:', err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-32 mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-muted-foreground">Event not found</h2>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/">Back to Events</Link>
        </Button>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          asChild
          variant="ghost"
          className="mb-8 hover:bg-primary/10 transition-colors duration-300"
        >
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </Link>
        </Button>

        <Card className="overflow-hidden border-none shadow-xl">
          {event.image && (
            <div className="relative h-64 md:h-80">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <CardHeader className="pt-8 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                {event.title}
              </CardTitle>
              <Badge variant="secondary" className="text-lg px-4 py-1">
                ${event.price}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-3">
              {event.created_by.avatar && (
                <Image
                  src={event.created_by.avatar}
                  alt={event.created_by.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <p className="text-muted-foreground flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Hosted by {event.created_by.username}
              </p>
            </div>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-8 py-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Date</h3>
                  <p className="text-muted-foreground">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Time</h3>
                  <p className="text-muted-foreground">{formattedTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="prose dark:prose-invert max-w-none"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-semibold text-lg mb-3">About this event</h3>
              <p>{event.description}</p>
            </motion.div>
          </CardContent>

          <Separator className="my-4" />

          <div className="p-6 flex justify-end">
            <CheckoutButton
              eventId={event.id}
              eventName={event.title}
              amount={parseFloat(event.price)}
              className="w-full md:w-auto px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors duration-300"
            />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}