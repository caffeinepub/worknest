import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Wifi, Car, Monitor, Coffee } from 'lucide-react';

interface AmenitiesPickerProps {
  value: string[];
  onChange: (amenities: string[]) => void;
}

const availableAmenities = [
  { id: 'WiFi', label: 'WiFi', icon: Wifi },
  { id: 'Parking', label: 'Parking', icon: Car },
  { id: 'Desk', label: 'Desk', icon: Monitor },
  { id: 'Tea/Coffee', label: 'Tea/Coffee', icon: Coffee },
];

export default function AmenitiesPicker({ value, onChange }: AmenitiesPickerProps) {
  const handleToggle = (amenityId: string) => {
    if (value.includes(amenityId)) {
      onChange(value.filter((a) => a !== amenityId));
    } else {
      onChange([...value, amenityId]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {availableAmenities.map((amenity) => {
        const Icon = amenity.icon;
        return (
          <div key={amenity.id} className="flex items-center space-x-3">
            <Checkbox
              id={amenity.id}
              checked={value.includes(amenity.id)}
              onCheckedChange={() => handleToggle(amenity.id)}
            />
            <Label
              htmlFor={amenity.id}
              className="flex items-center gap-2 cursor-pointer font-normal"
            >
              <Icon className="h-4 w-4" />
              {amenity.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
