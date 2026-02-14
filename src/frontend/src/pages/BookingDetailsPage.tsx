import { useParams, useNavigate } from '@tanstack/react-router';
import AuthGate from '@/components/auth/AuthGate';
import { useMyBookings } from '@/hooks/useMyBookings';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import WorkspaceGallery from '@/components/workspaces/WorkspaceGallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Wifi, Car, Monitor, Coffee, AlertCircle, ArrowLeft, Clock } from 'lucide-react';
import { formatINR, formatBookingTime } from '@/lib/format';

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  desk: Monitor,
  'tea/coffee': Coffee,
};

export default function BookingDetailsPage() {
  const { bookingIndex } = useParams({ from: '/booking/$bookingIndex' });
  const navigate = useNavigate();
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useMyBookings();
  const { data: workspaces, isLoading: workspacesLoading } = useWorkspaces();

  const isLoading = bookingsLoading || workspacesLoading;
  const index = parseInt(bookingIndex);
  const booking = bookings?.[index];
  const workspace = workspaces?.find((w) => w.id === booking?.workspaceId);

  if (isLoading) {
    return (
      <AuthGate>
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-96 w-full rounded-lg" />
          <Skeleton className="h-32 w-full" />
        </div>
      </AuthGate>
    );
  }

  if (bookingsError || !booking || !workspace) {
    return (
      <AuthGate>
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => navigate({ to: '/my-bookings' })} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to My Bookings
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Booking not found or failed to load.
            </AlertDescription>
          </Alert>
        </div>
      </AuthGate>
    );
  }

  return (
    <AuthGate>
      <div className="space-y-6 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate({ to: '/my-bookings' })} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to My Bookings
        </Button>

        <WorkspaceGallery photos={workspace.photos} name={workspace.name} />

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{workspace.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="h-5 w-5" />
              <span>{workspace.location}</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>Booked on {formatBookingTime(booking.bookingTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Duration:</span>
                <Badge variant="secondary">
                  {booking.hours.toString()} hour{Number(booking.hours) > 1 ? 's' : ''}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Hourly Rate:</span>
                <span className="font-semibold">{formatINR(workspace.hourlyRate)}/hr</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Paid:</span>
                  <span className="text-2xl">{formatINR(booking.totalPaid)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {workspace.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity.toLowerCase()] || Monitor;
                  return (
                    <Badge key={amenity} variant="secondary" className="gap-2 py-2 px-3">
                      <Icon className="h-4 w-4" />
                      {amenity}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGate>
  );
}
