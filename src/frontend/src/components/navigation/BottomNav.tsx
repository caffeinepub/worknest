import { Link, useRouterState } from '@tanstack/react-router';
import { Home, List, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/my-listings', label: 'My Listings', icon: List },
    { path: '/my-bookings', label: 'My Bookings', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || 
              (item.path !== '/' && currentPath.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
