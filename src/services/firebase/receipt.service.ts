import { db } from '../../config/firebase';
import { Receipt, CreateReceiptInput } from '../../types/receipt.types';

const COLLECTION_NAME = 'receipts';

export const getReceipts = async (userId: string): Promise<Receipt[]> => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Receipt));
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch receipts');
  }
};

export const addReceipt = async (userId: string, data: CreateReceiptInput): Promise<Receipt> => {
  try {
    const newReceiptData = {
      ...data,
      userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    const docRef = await db.collection(COLLECTION_NAME).add(newReceiptData);
    
    return {
      id: docRef.id,
      ...newReceiptData,
    } as Receipt;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add receipt');
  }
};

export const updateReceipt = async (receiptId: string, data: Partial<Receipt>): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(receiptId).update(data);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update receipt');
  }
};

export const deleteReceipt = async (receiptId: string): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(receiptId).delete();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete receipt');
  }
};
