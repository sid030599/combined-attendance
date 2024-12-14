from rest_framework.routers import DefaultRouter
from .views import UserShiftViewSet, WeeklyOffViewSet, ShiftViewSet

router = DefaultRouter()
router.register('usershifts', UserShiftViewSet)
router.register('weekly-offs', WeeklyOffViewSet)
router.register('shifts', ShiftViewSet)

urlpatterns = router.urls
