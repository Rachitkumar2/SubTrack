import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getSubscriptions, 
  addSubscription, 
  updateSubscription, 
  deleteSubscription 
} from '../services/firebase/subscription.service';
import { useAuthStore } from '../store/authStore';
import { CreateSubscriptionInput, Subscription } from '../types/subscription.types';

export const SUBSCRIPTIONS_QUERY_KEY = 'subscriptions';

export function useSubscriptions() {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: [SUBSCRIPTIONS_QUERY_KEY, user?.uid],
    queryFn: () => {
      if (!user?.uid) throw new Error('User not authenticated');
      return getSubscriptions(user.uid);
    },
    enabled: !!user?.uid, // Only fetch if user is authenticated
  });
}

export function useAddSubscription() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (data: CreateSubscriptionInput) => {
      if (!user?.uid) throw new Error('User not authenticated');
      return addSubscription(user.uid, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY, user?.uid] });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Subscription> }) => 
      updateSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY, user?.uid] });
    },
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (id: string) => deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIPTIONS_QUERY_KEY, user?.uid] });
    },
  });
}
