export interface ParsedReceipt {
  name: string;
  price: string;
  category: string;
}

const mockResults: ParsedReceipt[] = [
  { name: 'Netflix', price: '15.99', category: 'Entertainment' },
  { name: 'Adobe Creative Cloud', price: '54.99', category: 'Software' },
  { name: 'Equinox Gym', price: '250.00', category: 'Health' },
  { name: 'Spotify Premium', price: '10.99', category: 'Entertainment' },
  { name: 'AWS Cloud', price: '45.00', category: 'Utilities' }
];

export const processReceiptMock = async (imageUri: string): Promise<ParsedReceipt> => {
  // Simulate network delay and OCR processing time (3 seconds)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a random mock result
      const randomIndex = Math.floor(Math.random() * mockResults.length);
      resolve(mockResults[randomIndex]);
    }, 3000);
  });
};
