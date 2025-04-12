from django.urls import path
from . import views

urlpatterns = [
    path('user-portfolio/', views.user_portfolio),
    path('user-transactions/', views.user_transactions),
    path('stock-transactions/', views.stock_transactions),
    path('top-holders/', views.top_holders),
    path('transactions-in-range/', views.transactions_in_range),
    path('register/', views.register_user),
    path('login/', views.login_user),
]
