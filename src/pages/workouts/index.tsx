/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { Flex, Image, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import { Header } from 'components/Header';
import { Workout } from 'components/Workout';
import { WorkoutGrid } from 'components/WorkoutGrid';
import { useAuth } from 'hooks/useAuth';
import { supabase } from 'services/supabase';

type WorkoutData = {
  descricao: string;
  id: number;
  nome: string;
  usuario: string;
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutData[]>();
  const { loading, user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('treino')
        .select('*')
        .eq('usuario', user?.id);

      if (data) {
        setWorkouts(data);
      }
    }

    fetchData();
  }, [user?.id]);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <>
      <Head>
        <title>shape.it</title>

        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Header />

      <Flex
        mx={{ base: '6', md: '8', lg: '12', xl: '24' }}
        mb={{ base: '8', lg: '10', xl: '0' }}
        mt={{ base: '24', md: '28', lg: '32' }}
      >
        {workouts?.length === 0 && !loading && (
          <Flex flexDirection="column" align="center" flex="1">
            <Image
              src="/images/weightlifting.png"
              alt="Weightlifting"
              boxSize={{ base: '48', lg: '56', xl: '60' }}
            />
            <Text fontWeight="bold" fontSize="xl" lineHeight="7" mt="8">
              Nenhum treino por aqui...
            </Text>
            <Text fontWeight="medium" fontSize="md" lineHeight="base" mt="1">
              Crie um treino e shape it up!
            </Text>
          </Flex>
        )}

        {workouts?.length === 0 && loading && (
          <PulseLoader
            color="#eba417"
            loading={loading}
            css={override}
            size={30}
          />
        )}

        {workouts && loading && (
          <PulseLoader
            color="#eba417"
            loading={loading}
            css={override}
            size={30}
          />
        )}

        {workouts && workouts?.length > 0 && !loading && (
          <WorkoutGrid>
            {workouts.map(singleWorkout => (
              <Workout
                key={singleWorkout.id}
                title={singleWorkout.nome}
                description={singleWorkout.descricao}
                handleClick={() => Router.push(`/workouts/${singleWorkout.id}`)}
              />
            ))}
          </WorkoutGrid>
        )}
      </Flex>
    </>
  );
}
