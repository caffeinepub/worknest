import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkspaceGalleryProps {
  photos: string[];
  name: string;
}

export default function WorkspaceGallery({ photos, name }: WorkspaceGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const validPhotos = photos.length > 0 ? photos : ['/assets/generated/worknest-photo-01.dim_1200x800.png'];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? validPhotos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === validPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/9] bg-muted">
        <img
          src={validPhotos[currentIndex]}
          alt={`${name} - Photo ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {validPhotos.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {validPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
