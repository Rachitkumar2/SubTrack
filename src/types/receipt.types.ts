export type ReceiptStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ReceiptSourceType = 'image' | 'pdf' | 'camera';

export interface Receipt {
  id: string;
  userId: string;
  fileUrl: string;
  sourceType: ReceiptSourceType;
  parsedText?: string;
  status: ReceiptStatus;
  createdAt: string;
}

export type CreateReceiptInput = Omit<Receipt, 'id' | 'createdAt' | 'status' | 'parsedText'>;
