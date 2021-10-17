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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostgrestError } from '@supabase/supabase-js';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { Exercice } from '../../components/Exercice';
import { Header } from '../../components/Header';
import { Input } from '../../components/input';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../services/supabase';

type ExerciceData = {
  id: number;
  nome: string;
  serie: number;
  repeticoes: string;
  peso: number;
};

type Workout = {
  nome: string;
};

interface SingleWorkoutProps {
  exercices: ExerciceData[];
  erro: PostgrestError | null | undefined;
  workout: Workout[];
}

interface CreateWorkoutData {
  name: string;
  series: number;
  reps: string;
  weight: number;
}

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  series: yup.string().required('Campo obrigatório'),
  reps: yup.string().required('Campo obrigatório'),
  weight: yup.string(),
});

export default function SingleWorkout({
  erro,
  workout,
  exercices,
}: SingleWorkoutProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [allExercices, setAllExercices] = useState<ExerciceData[]>();

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
        peso: values.weight,
        treino: router.query.id,
      },
    ]);

    if (data) {
      setAllExercices(prev => prev && [...prev, ...data]);
    }

    setIsSending(false);

    onClose();

    reset();
  };

  useEffect(() => {
    setAllExercices(exercices);
  }, [exercices]);

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
            <Flex align="center">
              <IconButton
                border="0"
                background="none"
                borderRadius="6"
                w="12"
                h="12"
                _hover={{
                  transition: 0.2,
                  filter: 'brightness(0.9)',
                  background: 'gray.700',
                }}
                onClick={() => router.back()}
                aria-label="Abrir menu"
                icon={<RiArrowLeftSLine fontSize="3rem" />}
                mr={{ base: '0', lg: '6', xl: '12' }}
              />
              <Text
                fontSize={{ base: 'xl', lg: '3xl', xl: '4xl' }}
                fontWeight="bold"
              >
                {workout[0].nome}
              </Text>
            </Flex>

            <Flex align="center">
              <Button
                background="none"
                color="blue.500"
                _hover={{
                  transition: 0.2,
                  filter: 'brightness(1.2)',
                  background: 'gray.700',
                }}
                mr={{ base: '2', lg: '4', xl: '10' }}
              >
                Editar
              </Button>

              <Button
                background="none"
                color="blue.500"
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
            </Flex>
          </Flex>

          <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              reset();
            }}
          >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(createWorkout)}>
              <ModalHeader color="yellow.500">Criar exercício</ModalHeader>

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
                  colorScheme="blue"
                  variant="ghost"
                  type="submit"
                  isLoading={isSending}
                >
                  Criar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={{ base: '4', lg: '6', xl: '10' }}
            width="100%"
            mt="10"
          >
            {!erro &&
              allExercices &&
              allExercices.map(singleExercice => (
                <Exercice
                  key={singleExercice.id}
                  nome={singleExercice.nome}
                  peso={singleExercice.peso}
                  repeticoes={singleExercice.repeticoes}
                  serie={singleExercice.serie}
                />
              ))}
          </Grid>

          {erro && erro !== undefined && erro.code !== '22P02' && (
            <Flex flexDirection="column" align="center" flex="1">
              <Text fontWeight="bold" fontSize="xl" lineHeight="7" mt="8">
                Tivemos um problema ao obter seus exercícios...
              </Text>
              <Text fontWeight="medium" fontSize="md" lineHeight="base" mt="1">
                Recarregue a página ou tente novamente mais tarde.
              </Text>
            </Flex>
          )}

          {erro && erro !== undefined && erro.code === '22P02' && (
            <Flex flexDirection="column" align="center" flex="1">
              <Text fontWeight="bold" fontSize="xl" lineHeight="7" mt="8">
                Nenhum exercício criado.
              </Text>
              <Button
                background="none"
                _hover={{
                  transition: 0.2,
                  filter: 'brightness(1.2)',
                  background: 'gray.700',
                }}
                mt="4"
              >
                Criar exercício
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);
  let exercices;
  let workout;
  let erro;

  if (ctx.params) {
    const { id } = ctx.params;

    const { data, error } = await supabase
      .from('exercicio')
      .select('*')
      .eq('treino', id);

    const workoutResponse = await supabase
      .from('treino')
      .select('nome')
      .eq('id', id)
      .eq('usuario', cookies['shape-it.user-id']);

    exercices = data;
    erro = error;
    workout = workoutResponse?.data;
  }

  return {
    props: { exercices, workout, erro },
  };
};
