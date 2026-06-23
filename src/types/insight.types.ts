export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface Insight {
  id: string;
  userId: string;
  summary: string;
  savingsEstimate: number;
  categoryBreakdown: CategoryBreakdown[];
  createdAt: string;
}

export type CreateInsightInput = Omit<Insight, 'id' | 'createdAt'>;
