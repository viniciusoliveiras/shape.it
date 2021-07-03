import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, firebase } from '../services/firebase';

type User = {
  name: string;
  email: string | null;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => void;
  signOut: () => void;
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

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
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
    });
  }

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
