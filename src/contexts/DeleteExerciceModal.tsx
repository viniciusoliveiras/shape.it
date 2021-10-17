import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode } from 'react';

type DeleteExerciceModalContextProps = {
  children: ReactNode;
};

type DeleteExerciceModalContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const DeleteExerciceModalContext = createContext(
  {} as DeleteExerciceModalContextType
);

export function DeleteExerciceModalContextProvider({
  children,
}: DeleteExerciceModalContextProps) {
  const { isOpen = false, onOpen, onClose } = useDisclosure();

  return (
    <DeleteExerciceModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </DeleteExerciceModalContext.Provider>
  );
}
