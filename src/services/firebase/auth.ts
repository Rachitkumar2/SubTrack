import { firebaseAuth, db } from '../../config/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Configure Google Sign-In
GoogleSignin.configure({
  // The Web Client ID is required for Firebase Google Auth.
  // It can be found in the Firebase Console -> Authentication -> Sign-in method -> Google -> Web SDK configuration
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
});

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: string;
}

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const userProfile: UserProfile = {
      uid: user.uid,
      name,
      email: user.email || email,
      createdAt: new Date().toISOString(),
    };

    await db.collection('users').doc(user.uid).set(userProfile);
    return userProfile;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign up');
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const userDoc = await db.collection('users').doc(user.uid).get();
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      return {
        uid: user.uid,
        name: user.displayName || 'User',
        email: user.email || email,
        createdAt: new Date().toISOString(),
      } as UserProfile;
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signOut = async () => {
  try {
    await firebaseAuth.signOut();
    try {
      await GoogleSignin.signOut();
    } catch (e) {
      // Ignore if not signed in with Google
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    
    // In development, force sign out first so the account picker always shows
    if (__DEV__) {
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        // Ignore
      }
    }

    const userInfo = await GoogleSignin.signIn();
    if (!userInfo.data?.idToken) {
      throw new Error('No ID token present!');
    }
    
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
    
    const userCredential = await firebaseAuth.signInWithCredential(googleCredential);
    const user = userCredential.user;

    const userDocRef = db.collection('users').doc(user.uid);
    const userDoc = await userDocRef.get();
    
    let userProfile: UserProfile;
    if (!userDoc.exists()) {
      userProfile = {
        uid: user.uid,
        name: user.displayName || 'User',
        email: user.email || '',
        createdAt: new Date().toISOString(),
      };
      await userDocRef.set(userProfile);
    } else {
      userProfile = userDoc.data() as UserProfile;
    }
    return userProfile;
  } catch (error: any) {
    console.error("Google SignIn Error:", error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

let currentConfirmation: any = null;

export const sendPhoneOtp = async (phoneNumber: string) => {
  try {
    currentConfirmation = await firebaseAuth.signInWithPhoneNumber(phoneNumber);
    return true;
  } catch (error: any) {
    console.error("Send OTP Error:", error);
    throw new Error(error.message || 'Failed to send OTP');
  }
};

export const verifyPhoneOtp = async (code: string) => {
  if (!currentConfirmation) {
    throw new Error('No active OTP request found');
  }
  try {
    const userCredential = await currentConfirmation.confirm(code);
    const user = userCredential!.user;

    const userDocRef = db.collection('users').doc(user.uid);
    const userDoc = await userDocRef.get();
    
    let userProfile: UserProfile;
    if (!userDoc.exists()) {
      userProfile = {
        uid: user.uid,
        name: user.displayName || 'Phone User',
        email: user.email || '',
        createdAt: new Date().toISOString(),
      };
      await userDocRef.set(userProfile);
    } else {
      userProfile = userDoc.data() as UserProfile;
    }
    
    currentConfirmation = null;
    return userProfile;
  } catch (error: any) {
    console.error("Verify OTP Error:", error);
    throw new Error(error.message || 'Failed to verify OTP');
  }
};
