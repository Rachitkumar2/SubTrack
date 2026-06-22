import { useMemo } from 'react';
import { Subscription } from '../types/subscription.types';

export interface TrackingStats {
  monthlySpend: number;
  annualSpend: number;
  activeCount: number;
  upcomingRenewals: (Subscription & { daysLeft: number })[];
}

export function useTrackingStats(subscriptions: Subscription[] | undefined): TrackingStats {
  return useMemo(() => {
    if (!subscriptions) {
      return {
        monthlySpend: 0,
        annualSpend: 0,
        activeCount: 0,
        upcomingRenewals: [],
      };
    }

    const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
    
    let monthly = 0;
    let annual = 0;

    activeSubscriptions.forEach(sub => {
      if (sub.billingCycle === 'Monthly') {
        monthly += sub.price;
        annual += sub.price * 12;
      } else if (sub.billingCycle === 'Annual') {
        annual += sub.price;
        monthly += sub.price / 12;
      } else if (sub.billingCycle === 'Weekly') {
        monthly += sub.price * 4.33;
        annual += sub.price * 52;
      }
    });

    // Calculate upcoming renewals (next 30 days)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = activeSubscriptions
      .map(sub => {
        const renewal = new Date(sub.renewalDate);
        renewal.setHours(0, 0, 0, 0);
        
        // If renewal date is in the past, calculate the NEXT renewal date based on cycle
        while (renewal < today) {
          if (sub.billingCycle === 'Monthly') {
            renewal.setMonth(renewal.getMonth() + 1);
          } else if (sub.billingCycle === 'Annual') {
            renewal.setFullYear(renewal.getFullYear() + 1);
          } else if (sub.billingCycle === 'Weekly') {
            renewal.setDate(renewal.getDate() + 7);
          }
        }

        const diffTime = Math.abs(renewal.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return { ...sub, daysLeft: diffDays };
      })
      .filter(sub => sub.daysLeft <= 30)
      .sort((a, b) => a.daysLeft - b.daysLeft);

    return {
      monthlySpend: monthly,
      annualSpend: annual,
      activeCount: activeSubscriptions.length,
      upcomingRenewals: upcoming,
    };
  }, [subscriptions]);
}
