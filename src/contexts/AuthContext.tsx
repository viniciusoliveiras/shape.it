import { User, Session } from '@supabase/supabase-js';
import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { supabase } from '../services/supabase';

type AuthContextType = {
  user?: User;
  session?: Session;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    const currentSession = supabase.auth.session();
    const currentUser = supabase.auth.user();

    if (currentSession) {
      setSession(currentSession);
      setUser(currentUser ?? undefined);
      Router.push('/workouts');
      toast.success(
        `Seja bem vindo(a) de volta, ${currentUser?.user_metadata.full_name}`
      );
    }

    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession ?? undefined);
      setUser(newSession?.user ?? undefined);

      if (newSession?.user) {
        Router.push('/workouts');
        toast.success(
          `Seja bem vindo(a), ${newSession?.user?.user_metadata.full_name}`
        );
      }
    });

    return () => {
      data?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
}
