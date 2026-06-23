import { create } from 'zustand';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserProfile } from '../types/user.types';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  initialize: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  initialize: () => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            // If the user doc is missing a photoURL but Firebase Auth has one (e.g. Google), use it.
            if (!data.photoURL && firebaseUser.photoURL) {
              data.photoURL = firebaseUser.photoURL;
              // We could also update firestore here, but auth.ts handles it on explicit sign-in.
            }
            set({ user: data, isInitialized: true });
          } else {
            // Fallback user if not fully set up in Firestore yet
            set({
              user: {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                createdAt: new Date().toISOString(),
                photoURL: firebaseUser.photoURL || undefined,
              },
              isInitialized: true,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          set({ user: null, isInitialized: true });
        }
      } else {
        set({ user: null, isInitialized: true });
      }
    });

    return unsubscribe;
  },
}));
