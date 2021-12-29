from django.urls import path
from rest_framework.routers import DefaultRouter
from todos import views

router = DefaultRouter()
router.register(r'', views.TodoViewSet, basename='todo')
urlpatterns = router.urls

