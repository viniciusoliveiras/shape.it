/* eslint-disable no-use-before-define */
import { Button, Flex, IconButton, Text, Grid } from '@chakra-ui/react';
import { PostgrestError } from '@supabase/supabase-js';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React from 'react';
import { RiArrowLeftSLine, RiMenuAddLine } from 'react-icons/ri';

import { Exercice } from '../../components/Exercice';
import { Header } from '../../components/Header';
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

export default function SingleWorkout({
  erro,
  workout,
  exercices,
}: SingleWorkoutProps) {
  const router = useRouter();

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
                aria-label="Abrir menu"
                icon={<RiMenuAddLine fontSize="2rem" />}
              />
            </Flex>
          </Flex>

          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={{ base: '4', lg: '6', xl: '10' }}
            width="100%"
            mt="10"
          >
            {!erro &&
              exercices &&
              exercices.map(singleExercice => (
                <Exercice
                  key={singleExercice.id}
                  nome={singleExercice.nome}
                  peso={singleExercice.peso}
                  repeticoes={singleExercice.repeticoes}
                  serie={singleExercice.serie}
                />
              ))}
          </Grid>

          {erro && erro !== undefined && (
            <Flex flexDirection="column" align="center" flex="1">
              <Text fontWeight="bold" fontSize="xl" lineHeight="7" mt="8">
                Tivemos um problema ao obter seus exercícios...
              </Text>
              <Text fontWeight="medium" fontSize="md" lineHeight="base" mt="1">
                Recarregue a página ou tente novamente mais tarde.
              </Text>
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
      .select('id, nome, serie, repeticoes, peso')
      .eq('treino', id)
      .eq('usuario', cookies['shape-it.user-id']);

    const workoutResponse = await supabase
      .from('treino')
      .select('nome')
      .eq('id', id);

    exercices = data;
    erro = error;
    workout = workoutResponse?.data;
  }

  return {
    props: { exercices, workout, erro },
  };
};
