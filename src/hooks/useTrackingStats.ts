import { useMemo } from 'react';
import { Subscription } from '../types/subscription.types';

export interface TrackingStats {
  monthlySpend: number;
  annualSpend: number;
  activeCount: number;
  upcomingRenewals: (Subscription & { daysLeft: number })[];
  categoryBreakdown: { category: string; amount: number; percentage: number; color?: string }[];
}

// Fixed color palette for common categories (from ui-tokens)
const CATEGORY_COLORS: Record<string, string> = {
  'Entertainment': '#A1411F',   // brand primary
  'Software': '#2C313E',        // brand navy
  'Health': '#B8EDE3',          // accent aqua
  'Utilities': '#FFB59D',       // accent peach
  'Other': '#E0E9EF'            // border cool
};
const DEFAULT_COLOR = '#E0E9EF';

export function useTrackingStats(subscriptions: Subscription[] | undefined): TrackingStats {
  return useMemo(() => {
    if (!subscriptions) {
      return {
        monthlySpend: 0,
        annualSpend: 0,
        activeCount: 0,
        upcomingRenewals: [],
        categoryBreakdown: [],
      };
    }

    const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
    
    let monthly = 0;
    let annual = 0;
    const categoryTotals: Record<string, number> = {};

    activeSubscriptions.forEach(sub => {
      let subMonthlyCost = 0;
      if (sub.billingCycle === 'Monthly') {
        subMonthlyCost = sub.price;
        annual += sub.price * 12;
      } else if (sub.billingCycle === 'Annual') {
        annual += sub.price;
        subMonthlyCost = sub.price / 12;
      } else if (sub.billingCycle === 'Weekly') {
        subMonthlyCost = sub.price * 4.33;
        annual += sub.price * 52;
      }
      
      monthly += subMonthlyCost;
      
      const cat = sub.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + subMonthlyCost;
    });

    const categoryBreakdown = Object.keys(categoryTotals).map(cat => ({
      category: cat,
      amount: categoryTotals[cat],
      percentage: monthly > 0 ? (categoryTotals[cat] / monthly) * 100 : 0,
      color: CATEGORY_COLORS[cat] || DEFAULT_COLOR,
    })).sort((a, b) => b.amount - a.amount); // Sort by highest spend

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
      categoryBreakdown,
    };
  }, [subscriptions]);
}
