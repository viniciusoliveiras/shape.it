/* eslint-disable no-use-before-define */
import {
  Flex,
  IconButton,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { CgGym } from 'react-icons/cg';
import { RiDeleteBinLine, RiEditLine, RiMoreLine } from 'react-icons/ri';

import { useDeleteExerciceModal } from '../hooks/useDeleteExerciceModal';
import { DeleteExerciceModal } from './DeleteExerciceModal';

interface ExerciceProps {
  id: string;
  nome: string;
  serie: number;
  repeticoes: string;
  peso: number;
}

export function Exercice({ id, nome, peso, repeticoes, serie }: ExerciceProps) {
  const showGymIcon = useBreakpointValue({ base: true, md: false, lg: true });

  const { onOpen } = useDeleteExerciceModal();

  return (
    <Flex
      bgColor="gray.700"
      borderRadius="1rem"
      px={{ base: '4', md: '5', xl: '7' }}
      py={{ base: '3' }}
      h={{ xl: '32' }}
      align="center"
      w="100%"
      minH={{ base: '24', lg: '36' }}
    >
      {showGymIcon && (
        <IconButton
          border="0"
          background="none"
          borderRadius="6"
          w="12"
          h="12"
          _hover={{
            background: 'none',
            cursor: 'auto',
          }}
          aria-label="Halter"
          fontSize={{ base: '2xl', lg: '3xl' }}
          icon={<CgGym />}
          _focus={{
            outline: 'none',
          }}
          mr={{ base: '2', lg: '6' }}
        />
      )}

      <Flex justifyContent="space-between" align="center" w="100%">
        <Flex align="flex-start" flexDirection="column" minW={{ xl: '56' }}>
          <Text
            fontWeight="medium"
            fontSize={{ base: 'sm', lg: 'md', xl: 'lg' }}
            color="green.300"
          >
            {nome}
          </Text>
          <Text
            fontSize={{ base: 'xs', lg: 'sm', xl: 'md' }}
            fontWeight="light"
            color="gray.50"
          >
            {serie} x {repeticoes}
          </Text>

          {peso != null && (
            <Text
              fontSize={{ base: 'xs', lg: 'sm', xl: 'md' }}
              fontWeight="light"
              color="gray.50"
            >
              {peso} kg
            </Text>
          )}
        </Flex>
        <Flex>
          <Menu>
            <MenuButton
              as={Button}
              borderRadius="6"
              justify="center"
              align="center"
              variant="ghost"
              colorScheme="green"
              fontSize={{ base: 'xl', lg: '2xl', xl: '3xl' }}
            >
              <RiMoreLine />
            </MenuButton>

            <MenuList>
              <MenuItem icon={<RiEditLine fontSize="1.3rem" />}>
                <Text>Editar</Text>
              </MenuItem>

              <MenuItem
                icon={<RiDeleteBinLine fontSize="1.3rem" />}
                onClick={onOpen}
              >
                <Text>Excluir</Text>
              </MenuItem>
            </MenuList>
          </Menu>

          <DeleteExerciceModal id={id} exerciceName={nome} />
        </Flex>
      </Flex>
    </Flex>
  );
}
