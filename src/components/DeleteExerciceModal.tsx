import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useDeleteExerciceModal } from '../hooks/useDeleteExerciceModal';
import { queryClient } from '../services/queryClient';
import { supabase } from '../services/supabase';

interface DeleteExerciceModalProps {
  id: string;
  exerciceName: string;
}

export function DeleteExerciceModal({
  exerciceName,
  id,
}: DeleteExerciceModalProps) {
  const { isOpen, onClose } = useDeleteExerciceModal();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteExercice() {
    setIsDeleting(true);

    const { data } = await supabase.from('exercicio').delete().eq('id', id);

    if (data) {
      queryClient.invalidateQueries('exercices');
    }

    setIsDeleting(false);

    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="gray.700">
          <ModalHeader>Excluir exercício</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Deseja realmente excluir o exercício{' '}
              <Text fontWeight="semibold" color="yellow.500" as="span">
                {exerciceName}
              </Text>
              ?
              <br /> Esta ação é irreversível!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={onClose}
              disabled={isDeleting}
            >
              Não
            </Button>

            <Button
              colorScheme="blue"
              variant="ghost"
              onClick={deleteExercice}
              isLoading={isDeleting}
              disabled={isDeleting}
            >
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
