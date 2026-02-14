import { useWorkspaces } from '@/hooks/useWorkspaces';
import WorkspaceCard from '@/components/workspaces/WorkspaceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function HomePage() {
  const { data: workspaces, isLoading, error } = useWorkspaces();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <img 
          src="/assets/generated/worknest-logo.dim_512x512.png" 
          alt="WorkNest" 
          className="h-12 w-12"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WorkNest</h1>
          <p className="text-muted-foreground">Find your perfect workspace</p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load workspaces. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces?.map((workspace) => (
            <WorkspaceCard key={workspace.id.toString()} workspace={workspace} />
          ))}
        </div>
      )}

      {!isLoading && workspaces?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No workspaces available at the moment.</p>
        </div>
      )}
    </div>
  );
}
