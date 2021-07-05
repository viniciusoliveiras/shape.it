import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, firebase } from '../services/firebase';

type User = {
  name: string;
  email: string | null;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(subUser => {
      if (subUser) {
        const { displayName, photoURL, email } = subUser;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          name: displayName,
          email,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, email, photoURL } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        name: displayName,
        email,
        avatar: photoURL,
      });
    }
  }

  async function signOut() {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
      })
      .catch(error => {
        throw new Error(`Error to sign out: ${error}`);
      });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
