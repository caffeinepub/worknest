import AuthGate from '@/components/auth/AuthGate';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import ProfileMenu from '@/components/profile/ProfileMenu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useUserProfile();

  const principalText = identity?.getPrincipal().toString() || '';
  const shortPrincipal = principalText.slice(0, 8) + '...' + principalText.slice(-6);

  return (
    <AuthGate>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/assets/generated/avatar-default.dim_256x256.png" />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold">
                      {profile?.name || 'User'}
                    </h2>
                    <p className="text-sm text-muted-foreground font-mono">
                      {shortPrincipal}
                    </p>
                  </>
                )}
              </div>
            </div>

            <ProfileMenu />
          </CardContent>
        </Card>
      </div>
    </AuthGate>
  );
}
