import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import AuthGate from '@/components/auth/AuthGate';
import { useAddWorkspace } from '@/hooks/useMyListings';
import AmenitiesPicker from '@/components/workspaces/AmenitiesPicker';
import PhotoPicker from '@/components/workspaces/PhotoPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AddListingPage() {
  const navigate = useNavigate();
  const addWorkspace = useAddWorkspace();

  const [name, setName] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [location, setLocation] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const isValid = name.trim() && hourlyRate && parseInt(hourlyRate) > 0 && location.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addWorkspace.mutateAsync({
        name: name.trim(),
        hourlyRate: BigInt(parseInt(hourlyRate)),
        location: location.trim(),
        amenities,
        photos: photos.length > 0 ? photos : ['/assets/generated/worknest-photo-01.dim_1200x800.png'],
      });
      
      toast.success('Listing created successfully!');
      navigate({ to: '/my-listings' });
    } catch (error: any) {
      toast.error('Failed to create listing', {
        description: error.message || 'Please try again later.',
      });
    }
  };

  return (
    <AuthGate>
      <div className="space-y-6 max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/my-listings' })}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Listings
        </Button>

        <div>
          <h1 className="text-3xl font-bold">Add New Listing</h1>
          <p className="text-muted-foreground">List your workspace for hourly bookings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workspace Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Cozy Home Office"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Satellite, Ahmedabad, Gujarat"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="1"
                  placeholder="e.g., 250"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <AmenitiesPicker value={amenities} onChange={setAmenities} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoPicker value={photos} onChange={setPhotos} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe your workspace, any special features, rules, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/my-listings' })}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || addWorkspace.isPending}
              className="flex-1"
            >
              {addWorkspace.isPending ? 'Creating...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </div>
    </AuthGate>
  );
}
