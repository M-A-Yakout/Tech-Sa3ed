import api from '../lib/api';
import { useState } from 'react';
'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from './ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  eventId: number;
  eventName: string;
  amount: number;
}

export default function CheckoutButton({ eventId, eventName, amount }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await api.post('/payments/create-checkout-session/', {
        event_id: eventId,
        amount: Math.round(amount * 100), // cents
      });

      const sessionId = response.data.sessionId;
      const stripe = await stripePromise;
      const { error } = await stripe?.redirectToCheckout({ sessionId }) || {};

      if (error) {
        console.error(error);
      }
    } catch (err) {
      alert('Payment setup failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className="w-full mt-6"
      size="lg"
    >
      {loading ? 'Processing...' : `Pay $${amount} with Card`}
    </Button>
  );
}