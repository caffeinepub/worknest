import { useState } from 'react';
import { SignOutButton } from '@/components/auth/AuthButtons';
import PlaceholderScreen from '@/pages/profile/PlaceholderScreen';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings, Edit, Star, Mail, HelpCircle } from 'lucide-react';

export default function ProfileMenu() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'edit-profile', label: 'Edit Profile', icon: Edit },
    { id: 'rate-us', label: 'Rate Us', icon: Star },
    { id: 'contact-us', label: 'Contact Us', icon: Mail },
    { id: 'need-help', label: 'Need Help', icon: HelpCircle },
  ];

  return (
    <>
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => setActiveModal(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
        
        <Separator className="my-2" />
        
        <SignOutButton />
      </div>

      {activeModal && (
        <PlaceholderScreen
          title={menuItems.find((item) => item.id === activeModal)?.label || ''}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
