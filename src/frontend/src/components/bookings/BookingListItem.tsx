import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';
import { formatINR, formatBookingTime } from '@/lib/format';
import type { Booking } from '@/backend';

interface BookingListItemProps {
  booking: Booking;
  workspaceName: string;
  onClick: () => void;
}

export default function BookingListItem({ booking, workspaceName, onClick }: BookingListItemProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg">{workspaceName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatBookingTime(booking.bookingTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {booking.hours.toString()} hour{Number(booking.hours) > 1 ? 's' : ''}
              </Badge>
              <span className="text-sm font-semibold">{formatINR(booking.totalPaid)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
