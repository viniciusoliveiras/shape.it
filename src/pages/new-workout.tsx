/* eslint-disable no-use-before-define */
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

import { Header } from '../components/Header';
import { NewWorkoutForm } from '../components/NewWorkoutForm';

export default function NewWorkout() {
  return (
    <>
      <Head>
        <title>shape.it</title>
      </Head>

      <Header />
      <Flex
        mx={{ base: '6', md: '8', lg: '12', xl: '24' }}
        mb={{ base: '4', md: '8', xl: '12' }}
      >
        <NewWorkoutForm />
      </Flex>
    </>
  );
}
