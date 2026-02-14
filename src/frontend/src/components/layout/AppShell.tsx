import { ReactNode } from 'react';
import BottomNav from '../navigation/BottomNav';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
