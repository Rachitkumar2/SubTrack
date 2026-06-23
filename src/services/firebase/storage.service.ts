import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const uploadReceiptImage = async (imageUri: string): Promise<string> => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('User must be logged in to upload a receipt.');
  }

  const filename = `${new Date().getTime()}.jpg`;
  const reference = storage().ref(`receipts/${user.uid}/${filename}`);

  try {
    await reference.putFile(imageUri);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to upload image.');
  }
};

export const uploadProfilePhoto = async (imageUri: string): Promise<string> => {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('User must be logged in to upload a profile photo.');
  }

  const filename = `profile_${new Date().getTime()}.jpg`;
  const reference = storage().ref(`users/${user.uid}/${filename}`);

  try {
    await reference.putFile(imageUri);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to upload profile photo.');
  }
};
