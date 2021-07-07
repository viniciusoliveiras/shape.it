import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
      const credential = result.credential as firebase.auth.OAuthCredential;
      const token = credential.idToken;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      toast.success(`Seja bem vindo(a) ${result.user.displayName}!`);

      Router.push('/workouts');

      setUser({
        name: displayName,
        email,
        avatar: photoURL,
      });

      setCookie(undefined, 'shapeit.idToken', token || '', {
        path: '/',
      });
    }
  }

  async function signOut() {
    try {
      await firebase.auth().signOut();

      toast.success('Logout realizado');

      Router.push('/');

      setUser(undefined);

      destroyCookie(undefined, 'shapeit.idToken');
    } catch (error) {
      toast.error('Erro ao realizar o logout. Tente mais tarde');

      throw new Error(`Error to sign out: ${error}`);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
