import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Workspace } from '@/backend';

export function useMyListings() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Workspace[]>({
    queryKey: ['myListings'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyListings();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddWorkspace() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      hourlyRate: bigint;
      location: string;
      amenities: string[];
      photos: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addWorkspace(
        data.name,
        data.hourlyRate,
        data.location,
        data.amenities,
        data.photos
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
}
