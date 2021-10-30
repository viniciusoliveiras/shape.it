import { useContext } from 'react';

import { DeleteExerciceModalContext } from 'contexts/DeleteExerciceModal';

export function useDeleteExerciceModal() {
  const value = useContext(DeleteExerciceModalContext);

  return value;
}
