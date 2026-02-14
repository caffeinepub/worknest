import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { seedWorkspaces } from '@/data/seedWorkspaces';
import type { Workspace } from '@/backend';

export function useWorkspaces() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Workspace[]>({
    queryKey: ['workspaces'],
    queryFn: async () => {
      // Since backend doesn't have getAllWorkspaces, use seed data
      return seedWorkspaces;
    },
    enabled: !actorFetching,
  });
}

export function useWorkspaceById(workspaceId: string) {
  const { data: workspaces, isLoading, error } = useWorkspaces();

  const workspace = workspaces?.find((w) => w.id.toString() === workspaceId);

  return {
    data: workspace,
    isLoading,
    error: error || (!isLoading && !workspace ? new Error('Workspace not found') : null),
  };
}
