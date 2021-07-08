/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { Flex, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';

import { AlertConfirm } from '../components/AlertConfirm';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Workout } from '../components/Workout';
import { WorkoutGrid } from '../components/WorkoutGrid';

export default function Workouts() {
  const [workouts, setWorkouts] = useState<string>();

  return (
    <>
      <Head>
        <title>shape.it | treinos</title>
      </Head>

      <AlertConfirm setWorkouts={setWorkouts} />

      <Header />
      <Flex
        mx={{ base: '6', md: '8', lg: '12', xl: '24' }}
        mb={{ base: '4', md: '8', xl: '12' }}
      >
        <Sidebar />

        {!workouts && (
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

        {workouts && (
          <WorkoutGrid>
            <Workout
              title="Série A"
              exerciseNumber={8}
              description="Pellentesque lorem nulla, sollicitudin sed nulla vel, porttitor consequat purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi."
            />

            <Workout
              title="Série B"
              exerciseNumber={6}
              description="Maecenas sit amet eros maximus neque varius aliquet nec a enim. Cras viverra erat a quam pretium pellentesque. Mauris vel magna quis sem ultricies consequat."
            />

            <Workout
              title="Série C"
              exerciseNumber={10}
              description="Fusce efficitur enim vitae lorem suscipit, sit amet dapibus diam ultrices. Duis nec ex vel velit aliquet facilisis et cursus urna."
            />

            <Workout
              title="Série D"
              exerciseNumber={1}
              description="In a est accumsan, blandit magna nec, tincidunt arcu. Aliquam pellentesque lectus in turpis congue mattis. Proin non fringilla leo, nec malesuada dui."
            />
          </WorkoutGrid>
        )}
      </Flex>
    </>
  );
}
