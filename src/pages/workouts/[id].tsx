/* eslint-disable no-use-before-define */
import { Button, Flex, IconButton, Text, Grid } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { RiArrowLeftSLine, RiMenuAddLine } from 'react-icons/ri';

import { Exercice } from '../../components/Exercice';
import { Header } from '../../components/Header';

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

          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={{ base: '4', lg: '6', xl: '10' }}
            width="100%"
            mt="10"
          >
            <Exercice title="supino ap | cluster" />
            <Exercice title="supino 30º" />
            <Exercice title="extensão de ombros + puxada romana" />
            <Exercice title="tríceps ap + francês HBC" />
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
