import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

interface AlertConfirmProps {
  setWorkouts: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function AlertConfirm({ setWorkouts }: AlertConfirmProps) {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={undefined}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="gray.700">
              Olá!
            </AlertDialogHeader>

            <AlertDialogBody color="gray.700">
              Gostaria de simular a página com treinos fictícios?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                backgroundColor="red.500"
                color="white"
                onClick={onClose}
                ml={3}
              >
                Não
              </Button>
              <Button
                backgroundColor="green.500"
                color="white"
                onClick={() => {
                  setWorkouts('undefined');
                  onClose();
                }}
                ml={3}
              >
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
