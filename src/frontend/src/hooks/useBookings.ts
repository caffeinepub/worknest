import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { workspaceId: bigint; hours: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.bookWorkspace(data.workspaceId, data.hours);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    },
  });
}
