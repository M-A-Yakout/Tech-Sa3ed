import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from events.models import Event

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    event_id = request.data.get('event_id')
    event = get_object_or_404(Event, id=event_id)
    amount = request.data.get('amount')  # in cents

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {'name': event.title},
                    'unit_amount': amount,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:3000/my-tickets?success=true',
            cancel_url=f'http://localhost:3000/event/{event.id}?canceled=true',
            metadata={
                'event_id': event.id,
                'user_id': request.user.id,
            }
        )
        return Response({'sessionId': session.id})
    except Exception as e:
        return Response({'error': str(e)}, status=400)