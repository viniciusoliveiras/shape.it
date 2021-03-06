import { User, Session } from '@supabase/supabase-js';
import { setCookie } from 'nookies';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { supabase } from 'services/supabase';

type AuthContextType = {
  user?: User;
  session?: Session;
  handleLogin: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState(supabase.auth.user() ?? undefined);
  const [session, setSession] = useState(supabase.auth.session() ?? undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      setUser(supabase.auth.user() ?? undefined);
      setSession(supabase.auth.session() ?? undefined);

      if (event === 'SIGNED_IN') {
        setCookie(
          undefined,
          'shape-it.access-token',
          newSession?.access_token || '',
          {
            path: '/',
            maxAge: 604800, // 1 week
          }
        );

        setCookie(undefined, 'shape-it.user-id', newSession?.user?.id || '', {
          path: '/',
          maxAge: 604800, // 1 week
        });
      }
    });

    return () => {
      data?.unsubscribe();
    };
  }, []);

  async function handleLogin() {
    const { error } = await supabase.auth.signIn(
      {
        provider: 'google',
      },
      {
        redirectTo: process.env.NEXT_PUBLIC_SUPABASE_URL_REDIRECT,
      }
    );

    if (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, session, handleLogin, setLoading, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
