export type BillingCycle = 'Monthly' | 'Annual' | 'Weekly';

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

export interface Subscription {
  id: string; // Document ID from Firestore
  userId: string;
  name: string;
  logo?: string; // Optional URL or identifier for an icon
  category: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  renewalDate: string; // ISO 8601 string, or handle as Date object depending on how we parse Firestore Timestamp
  paymentMethod?: string;
  status: SubscriptionStatus;
  createdAt: string; // ISO 8601 string
}

// Utility to create a partial type for creating a new subscription (Firestore usually generates the ID)
export type CreateSubscriptionInput = Omit<Subscription, 'id' | 'createdAt' | 'userId'>;
