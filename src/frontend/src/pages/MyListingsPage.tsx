import { useNavigate } from '@tanstack/react-router';
import AuthGate from '@/components/auth/AuthGate';
import { useMyListings } from '@/hooks/useMyListings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, MapPin, AlertCircle } from 'lucide-react';
import { formatINR } from '@/lib/format';

export default function MyListingsPage() {
  const navigate = useNavigate();
  const { data: listings, isLoading, error } = useMyListings();

  return (
    <AuthGate>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground">Manage your workspace listings</p>
          </div>
          <Button onClick={() => navigate({ to: '/add-listing' })} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load your listings. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="space-y-4">
            {listings.map((listing) => (
              <Card key={listing.id.toString()} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-48 h-48 sm:h-auto">
                      <img
                        src={listing.photos[0] || '/assets/generated/worknest-photo-01.dim_1200x800.png'}
                        alt={listing.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 space-y-2">
                      <h3 className="text-xl font-semibold">{listing.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{listing.location}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-lg">{formatINR(listing.hourlyRate)}/hr</span>
                        <span className="text-sm text-muted-foreground">
                          {listing.amenities.length} amenities
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Plus className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
              <p className="text-muted-foreground mb-6">
                Start earning by listing your workspace
              </p>
              <Button onClick={() => navigate({ to: '/add-listing' })} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Listing
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGate>
  );
}
