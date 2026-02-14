import { useParams, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useWorkspaceById } from '@/hooks/useWorkspaces';
import { useCreateBooking } from '@/hooks/useBookings';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import WorkspaceGallery from '@/components/workspaces/WorkspaceGallery';
import MockCheckout from '@/components/bookings/MockCheckout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Wifi, Car, Monitor, Coffee, AlertCircle, ArrowLeft } from 'lucide-react';
import { formatINR } from '@/lib/format';

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  desk: Monitor,
  'tea/coffee': Coffee,
};

export default function WorkspaceDetailsPage() {
  const { workspaceId } = useParams({ from: '/workspace/$workspaceId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: workspace, isLoading, error } = useWorkspaceById(workspaceId);
  const createBooking = useCreateBooking();
  
  const [hours, setHours] = useState<string>('');

  const hoursNum = parseInt(hours) || 0;
  const isValidHours = hoursNum > 0;
  const total = isValidHours ? Number(workspace?.hourlyRate || 0n) * hoursNum : 0;

  const handleBookingSuccess = () => {
    navigate({ to: '/my-bookings' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error || !workspace) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Workspace not found or failed to load.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
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

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatINR(workspace.hourlyRate)}</span>
              <span className="text-muted-foreground">per hour</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Number of Hours</Label>
              <Input
                id="hours"
                type="number"
                min="1"
                placeholder="Enter hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              {hours && !isValidHours && (
                <p className="text-sm text-destructive">Please enter a valid number of hours (minimum 1)</p>
              )}
            </div>

            {isValidHours && (
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatINR(BigInt(total))}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {identity ? (
          <MockCheckout
            workspaceId={workspace.id}
            hours={hoursNum}
            total={BigInt(total)}
            disabled={!isValidHours}
            isLoading={createBooking.isPending}
            onSuccess={handleBookingSuccess}
          />
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please sign in to book this workspace.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
