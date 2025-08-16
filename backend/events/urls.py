from django.urls import path
from . import views

urlpatterns = [
    path('events/', views.EventListCreateView.as_view(), name='event-list'),
    path('events/<int:pk>/', views.EventDetailView.as_view(), name='event-detail'),
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/me/', views.me_view, name='me'),
    path('tickets/buy/<int:event_id>/', views.create_ticket, name='buy-ticket'),
    path('tickets/my/', views.my_tickets, name='my-tickets'),
    path('tickets/checkin/<str:ticket_uuid>/', views.check_in_ticket, name='check-in-ticket'),
]