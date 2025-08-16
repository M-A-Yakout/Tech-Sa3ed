'use client';

import api from '@/lib/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Ticket {
  id: number;
  uuid: string;
  event: {
    title: string;
    description: string;
    date: string;
    location: string;
    price: number;
  };
  purchased_at: string;
  checked_in: boolean;
  qr_code: string;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    api.get('/tickets/my/')
      .then(res => {
        setTickets(res.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, user, userLoading]);

  if (loading || userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Tickets</h1>

      {tickets.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p>You haven&apos;t purchased any tickets yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map(ticket => (
            <Card key={ticket.uuid}>
              <CardHeader>
                <CardTitle>{ticket.event.title}</CardTitle>
                <CardDescription>
                  {new Date(ticket.event.date).toLocaleDateString()} at {ticket.event.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-lg font-semibold">Price: ${ticket.event.price}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Status: {ticket.checked_in ? 'Checked In' : 'Not Checked In'}
                </p>
                {ticket.qr_code && (
                  <Image 
                    src={`http://localhost:8000${ticket.qr_code}`} 
                    alt="Ticket QR Code" 
                    width={128}
                    height={128}
                    className="mt-4"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
