import { useState } from 'react';
import { useCreateBooking } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CreditCard, Smartphone } from 'lucide-react';
import { formatINR } from '@/lib/format';
import { toast } from 'sonner';

interface MockCheckoutProps {
  workspaceId: bigint;
  hours: number;
  total: bigint;
  disabled: boolean;
  isLoading: boolean;
  onSuccess: () => void;
}

export default function MockCheckout({
  workspaceId,
  hours,
  total,
  disabled,
  isLoading,
  onSuccess,
}: MockCheckoutProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const createBooking = useCreateBooking();

  const handlePaymentMethod = (method: string) => {
    setSelectedMethod(method);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      await createBooking.mutateAsync({
        workspaceId,
        hours: BigInt(hours),
      });
      toast.success('Booking confirmed!', {
        description: `Your workspace has been booked for ${hours} hour${hours > 1 ? 's' : ''}.`,
      });
      setShowConfirm(false);
      onSuccess();
    } catch (error: any) {
      toast.error('Booking failed', {
        description: error.message || 'Please try again later.',
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full gap-2 h-14"
            variant="default"
            disabled={disabled || isLoading}
            onClick={() => handlePaymentMethod('UPI')}
          >
            <Smartphone className="h-5 w-5" />
            Pay with UPI
          </Button>
          <Button
            className="w-full gap-2 h-14"
            variant="outline"
            disabled={disabled || isLoading}
            onClick={() => handlePaymentMethod('Card')}
          >
            <CreditCard className="h-5 w-5" />
            Pay with Card
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to book this workspace for {hours} hour{hours > 1 ? 's' : ''} using {selectedMethod}.
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-lg">{formatINR(total)}</span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Confirm Payment'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
