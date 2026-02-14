import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PlaceholderScreenProps {
  title: string;
  onClose: () => void;
}

export default function PlaceholderScreen({ title, onClose }: PlaceholderScreenProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            This feature is coming soon. Stay tuned for updates!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
