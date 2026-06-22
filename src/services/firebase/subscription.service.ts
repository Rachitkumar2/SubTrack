import { db } from '../../config/firebase';
import { Subscription, CreateSubscriptionInput } from '../../types/subscription.types';

const COLLECTION_NAME = 'subscriptions';

export const getSubscriptions = async (userId: string): Promise<Subscription[]> => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Subscription));
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch subscriptions');
  }
};

export const addSubscription = async (userId: string, data: CreateSubscriptionInput): Promise<Subscription> => {
  try {
    const newSubscriptionData = {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
    };
    
    const docRef = await db.collection(COLLECTION_NAME).add(newSubscriptionData);
    
    return {
      id: docRef.id,
      ...newSubscriptionData,
    } as Subscription;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add subscription');
  }
};

export const updateSubscription = async (subscriptionId: string, data: Partial<Subscription>): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(subscriptionId).update(data);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update subscription');
  }
};

export const deleteSubscription = async (subscriptionId: string): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(subscriptionId).delete();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete subscription');
  }
};
