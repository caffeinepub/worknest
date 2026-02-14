import { useNavigate } from '@tanstack/react-router';
import AuthGate from '@/components/auth/AuthGate';
import { useMyBookings } from '@/hooks/useMyBookings';
import { useWorkspaces } from '@/hooks/useWorkspaces';
import BookingListItem from '@/components/bookings/BookingListItem';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, AlertCircle } from 'lucide-react';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { data: bookings, isLoading: bookingsLoading, error } = useMyBookings();
  const { data: workspaces, isLoading: workspacesLoading } = useWorkspaces();

  const isLoading = bookingsLoading || workspacesLoading;

  const getWorkspaceName = (workspaceId: bigint) => {
    const workspace = workspaces?.find((w) => w.id === workspaceId);
    return workspace?.name || 'Unknown Workspace';
  };

  return (
    <AuthGate>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">View your workspace bookings</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load your bookings. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <BookingListItem
                key={index}
                booking={booking}
                workspaceName={getWorkspaceName(booking.workspaceId)}
                onClick={() => navigate({ to: `/booking/${index}` })}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
              <p className="text-muted-foreground">
                Browse workspaces and make your first booking
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGate>
  );
}
