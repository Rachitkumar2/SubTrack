import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile } from '../services/firebase/auth';

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            set({ user: userDoc.data() as UserProfile, isInitialized: true });
          } else {
            // Fallback user if not fully set up in Firestore yet
            set({
              user: {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                createdAt: new Date().toISOString(),
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
