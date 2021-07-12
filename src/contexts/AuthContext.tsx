import { User, Session } from '@supabase/supabase-js';
import { setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { supabase } from '../services/supabase';

type AuthContextType = {
  user?: User;
  session?: Session;
  handleLogin: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState(supabase.auth.user() ?? undefined);
  const [session, setSession] = useState(supabase.auth.session() ?? undefined);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      setUser(supabase.auth.user() ?? undefined);
      setSession(supabase.auth.session() ?? undefined);

      setCookie(
        undefined,
        'shape-it.access-token',
        newSession?.access_token || '',
        {
          path: '/',
        }
      );
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
        redirectTo: 'http://localhost:3000/workouts',
      }
    );

    if (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
