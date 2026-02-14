import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';

export function SignInButton() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <Button
      onClick={login}
      disabled={isLoggingIn}
      variant="default"
      className="gap-2"
    >
      <LogIn className="h-4 w-4" />
      {isLoggingIn ? 'Signing in...' : 'Sign In'}
    </Button>
  );
}

export function SignOutButton() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="gap-2 w-full justify-start"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
}
