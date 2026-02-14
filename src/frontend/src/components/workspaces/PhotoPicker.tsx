import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PhotoPickerProps {
  value: string[];
  onChange: (photos: string[]) => void;
}

const availablePhotos = [
  '/assets/generated/worknest-photo-01.dim_1200x800.png',
  '/assets/generated/worknest-photo-02.dim_1200x800.png',
  '/assets/generated/worknest-photo-03.dim_1200x800.png',
  '/assets/generated/worknest-photo-04.dim_1200x800.png',
  '/assets/generated/worknest-photo-05.dim_1200x800.png',
];

export default function PhotoPicker({ value, onChange }: PhotoPickerProps) {
  const handleToggle = (photo: string) => {
    if (value.includes(photo)) {
      onChange(value.filter((p) => p !== photo));
    } else {
      onChange([...value, photo]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Select photos for your workspace (at least one recommended)
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {availablePhotos.map((photo, index) => {
          const isSelected = value.includes(photo);
          return (
            <Card
              key={photo}
              className={cn(
                'relative overflow-hidden cursor-pointer transition-all hover:shadow-md',
                isSelected && 'ring-2 ring-primary'
              )}
              onClick={() => handleToggle(photo)}
            >
              <div className="aspect-[4/3]">
                <img
                  src={photo}
                  alt={`Workspace photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
