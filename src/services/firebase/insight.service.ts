import { db } from '../../config/firebase';
import { Insight, CreateInsightInput } from '../../types/insight.types';

const COLLECTION_NAME = 'insights';

export const getInsights = async (userId: string): Promise<Insight[]> => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Insight));
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch insights');
  }
};

export const addInsight = async (userId: string, data: CreateInsightInput): Promise<Insight> => {
  try {
    const newInsightData = {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
    };
    
    const docRef = await db.collection(COLLECTION_NAME).add(newInsightData);
    
    return {
      id: docRef.id,
      ...newInsightData,
    } as Insight;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add insight');
  }
};

export const updateInsight = async (insightId: string, data: Partial<Insight>): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(insightId).update(data);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update insight');
  }
};

export const deleteInsight = async (insightId: string): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(insightId).delete();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete insight');
  }
};
