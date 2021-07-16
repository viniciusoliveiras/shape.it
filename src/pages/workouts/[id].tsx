/* eslint-disable no-use-before-define */
import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { RiArrowLeftSLine, RiMenuAddLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

export default function SingleWorkout() {
  const router = useRouter();
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
        <Sidebar />

        <Flex alignSelf="flex-start" justify="space-between" flex="1">
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
              Série A
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
      </Flex>
    </>
  );
}
