import { useQuery } from 'react-query';

import { supabase } from 'services/supabase';
import { IExercice } from 'utils/types';

export async function getExercices(
  id: string | undefined
): Promise<IExercice[] | null> {
  const { data, error } = await supabase
    .from<IExercice>('exercicio')
    .select('*')
    .eq('treino', id?.toString() || '');

  const exercices: IExercice[] | null = data;

  if (error) {
    throw error;
  }

  return exercices;
}

export function useExercices(id: string | undefined) {
  return useQuery(['exercices'], () => getExercices(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
