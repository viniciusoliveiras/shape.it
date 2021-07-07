/* eslint-disable no-use-before-define */
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

export default function Workouts() {
  return (
    <>
      <Head>
        <title>shape.it | treinos</title>
      </Head>

      <Header />

      <Flex mx="24">
        <Sidebar />
      </Flex>
    </>
  );
}
