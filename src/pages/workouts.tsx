/* eslint-disable no-use-before-define */
import { Flex, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export default function Workouts() {
  const [workouts, setWorkouts] = useState(undefined);

  return (
    <>
      <Head>
        <title>shape.it | treinos</title>
      </Head>

      <Header />

      <Flex mx={{ base: '6', md: '8', lg: '12', xl: '24' }}>
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
      </Flex>
    </>
  );
}
