import { useQuery } from 'react-query';

import { supabase } from '../services/supabase';

export async function getExercices(id: string | undefined) {
  const { data, error } = await supabase
    .from('exercicio')
    .select('*')
    .eq('treino', id);

  const exercices = data;

  if (error) {
    throw error;
  }

  return { exercices };
}

export function useExercices(id: string | undefined) {
  return useQuery(['exercices'], () => getExercices(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
