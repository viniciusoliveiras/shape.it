/* eslint-disable no-use-before-define */
import {
  Button,
  Flex,
  IconButton,
  Text,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Stack,
  Spinner,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RiMore2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { Exercice } from '../../components/Exercice';
import { Header } from '../../components/Header';
import { Input } from '../../components/input';
import { useAuth } from '../../hooks/useAuth';
import { useExercices } from '../../hooks/useExercices';
import { queryClient } from '../../services/queryClient';
import { supabase } from '../../services/supabase';

type Workout = {
  nome: string;
};

interface SingleWorkoutProps {
  workout: Workout[];
}

interface CreateWorkoutData {
  name: string;
  series: number;
  reps: string;
  weight: string;
}

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  series: yup.string().required('Campo obrigatório'),
  reps: yup.string().required('Campo obrigatório'),
  weight: yup.string(),
});

export default function SingleWorkout({ workout }: SingleWorkoutProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [isDeleteWorkoutAlertOpen, setIsDeleteWorkoutAlertOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const onCloseDeleteWorkoutAlert = () => setIsDeleteWorkoutAlertOpen(false);
  const cancelRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkoutData>({
    resolver: yupResolver(schema),
  });

  const createWorkout: SubmitHandler<CreateWorkoutData> = async values => {
    setIsSending(true);

    const { data } = await supabase.from('exercicio').insert([
      {
        id: uuidv4(),
        usuario: user?.id,
        nome: values.name,
        serie: values.series,
        repeticoes: values.reps,
        peso: parseInt(values.weight, 10),
        treino: router.query.id,
      },
    ]);

    if (data) {
      queryClient.invalidateQueries('exercices');

      toast.success('Exercício criado');
    }

    setIsSending(false);

    onClose();

    reset();
  };

  const { refetch, data, isLoading, isFetching, error } = useExercices(
    router.query.id?.toString()
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function deleteWorkout() {
    setIsDeleting(true);

    const deleteExerciceResponse = await supabase
      .from('exercicio')
      .delete()
      .eq('treino', router.query.id?.toString());

    if (deleteExerciceResponse.data) {
      const deleteWorkoutResponse = await supabase
        .from('treino')
        .delete()
        .eq('id', router.query.id?.toString());

      if (deleteWorkoutResponse.data) {
        router.push('/workouts');
        toast.success('Treino excluído');
      }
    }

    setIsDeleting(false);
  }

  return (
    <>
      <Head>
        <title>shape.it</title>
      </Head>

      <Header />
      <Flex
        mx={{ base: '6', md: '8', lg: '12', xl: '24' }}
        mb={{ base: '8', lg: '10', xl: '0' }}
        mt={{ base: '24', lg: '28', xl: '32' }}
      >
        <Flex flexDirection="column" w="100%">
          <Flex alignSelf="flex-start" justify="space-between" w="100%">
            <HStack
              spacing={{ base: '0', lg: '4' }}
              display="flex"
              alignItems="center"
              justifyContent={{ base: 'space-between', lg: 'flex-start' }}
              w="100%"
            >
              <Text
                fontSize={{ base: 'xl', lg: '3xl', xl: '4xl' }}
                fontWeight="bold"
              >
                {workout[0].nome}{' '}
                {isLoading ||
                  (isFetching && (
                    <Spinner
                      thickness="0.2rem"
                      speed="1s"
                      color="green.500"
                      size="md"
                      ml="4"
                    />
                  ))}
              </Text>

              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<RiMore2Fill fontSize="1.5rem" />}
                  display={{ base: 'flex', lg: 'none' }}
                  variant="ghost"
                  alignItems="center"
                  justifyContent="center"
                  colorScheme="green"
                />
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      router.push(`/workouts/edit/${router.query.id}`)
                    }
                  >
                    Editar treino
                  </MenuItem>

                  <MenuItem onClick={() => setIsDeleteWorkoutAlertOpen(true)}>
                    Excluir treino
                  </MenuItem>

                  <MenuItem onClick={onOpen}>Criar exercício</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <HStack
              spacing="2"
              color="green.300"
              display={{ base: 'none', lg: 'flex' }}
            >
              <Button
                background="none"
                color="green.300"
                _hover={{
                  transition: 0.2,
                  filter: 'brightness(1.2)',
                  background: 'gray.700',
                }}
                onClick={() => router.push(`/workouts/edit/${router.query.id}`)}
              >
                Editar treino
              </Button>

              <Button
                background="none"
                color="green.300"
                _hover={{
                  transition: 0.2,
                  filter: 'brightness(1.2)',
                  background: 'gray.700',
                }}
                onClick={() => setIsDeleteWorkoutAlertOpen(true)}
              >
                Excluir treino
              </Button>

              <Button
                background="none"
                color="green.300"
                mr={{ base: '2', lg: '4', xl: '10' }}
                _hover={{
                  transition: 0.2,
                  filter: 'brightness(1.2)',
                  background: 'gray.700',
                }}
                onClick={onOpen}
              >
                Criar exercício
              </Button>
            </HStack>
          </Flex>

          <AlertDialog
            isOpen={isDeleteWorkoutAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onCloseDeleteWorkoutAlert}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Excluir treino
                </AlertDialogHeader>

                <AlertDialogBody>
                  Deseja realmente excluir este treino? <br />
                  Esta ação excluirá também todos os exercícios inclusos neste
                  treino.
                  <br />
                  Esta ação é irreversível!
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={onCloseDeleteWorkoutAlert}
                    variant="ghost"
                    disabled={isDeleting}
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant="ghost"
                    colorScheme="green"
                    ml={3}
                    isLoading={isDeleting}
                    disabled={isDeleting}
                    onClick={() => deleteWorkout()}
                  >
                    Excluir
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              reset();
            }}
          >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(createWorkout)}>
              <ModalHeader color="green.500">Criar exercício</ModalHeader>

              <ModalBody>
                <Stack spacing="4">
                  <Input
                    {...register('name')}
                    label="Nome"
                    error={errors.name}
                  />

                  <Input
                    {...register('series')}
                    type="number"
                    label="Série"
                    error={errors.series}
                  />

                  <Input
                    {...register('reps')}
                    label="Repetições"
                    error={errors.reps}
                  />

                  <Input
                    {...register('weight')}
                    type="number"
                    label="Carga / Peso"
                    error={errors.weight}
                  />
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  colorScheme="green"
                  variant="ghost"
                  type="submit"
                  isLoading={isSending}
                >
                  Criar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {!isLoading &&
            !isFetching &&
            data &&
            data.exercices &&
            data.exercices?.length > 0 && (
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
                gap={{ base: '4', lg: '6', xl: '10' }}
                width="100%"
                mt="10"
              >
                {data &&
                  data.exercices &&
                  data.exercices.map(singleExercice => (
                    <Exercice
                      key={singleExercice.id}
                      id={singleExercice.id}
                      nome={singleExercice.nome}
                      peso={singleExercice.peso}
                      repeticoes={singleExercice.repeticoes}
                      serie={singleExercice.serie}
                    />
                  ))}
              </Grid>
            )}

          {error && !isLoading && !isFetching && (
            <Flex flexDirection="column" align="center" flex="1" mt="20">
              <Text fontWeight="bold" fontSize="xl" lineHeight="7" mt="8">
                Tivemos um problema ao obter seus exercícios...
              </Text>
              <Text fontWeight="medium" fontSize="md" lineHeight="base" mt="1">
                Recarregue a página ou tente novamente mais tarde.
              </Text>
            </Flex>
          )}

          {!isLoading &&
            !isFetching &&
            !error &&
            data &&
            data.exercices &&
            data.exercices?.length === 0 && (
              <Flex flexDirection="column" align="center" flex="1" mt="20">
                <Text fontWeight="bold" fontSize="xl" lineHeight="7" mt="8">
                  Nenhum exercício criado...
                </Text>
              </Flex>
            )}
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx.params) {
    const cookies = nookies.get(ctx);
    const { id } = ctx.params;

    const workoutResponse = await supabase
      .from('treino')
      .select('nome')
      .eq('id', id)
      .eq('usuario', cookies['shape-it.user-id']);

    const workout = workoutResponse?.data;
    return {
      props: { workout },
    };
  }

  return {
    props: {},
  };
};
