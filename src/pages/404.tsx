/* eslint-disable no-use-before-define */
import { Flex, Text, Image } from '@chakra-ui/react';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { RiHomeLine } from 'react-icons/ri';

import { Header } from '../components/Header';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>shape.it</title>
      </Head>

      <Header />

      <Flex
        flex="1"
        flexDirection="column"
        align="center"
        justifyContent="space-around"
        h={{ base: '70vh', md: '100%' }}
        mt={{ base: '24', lg: '28', xl: '32' }}
      >
        <Flex align="center" flexDirection="column">
          <Image
            src="/images/404.svg"
            alt="404"
            w={{ base: '18.75rem', md: '23.75rem', lg: '33.75rem' }}
          />

          <Text
            fontSize={{ base: '2xl', md: '3xl', lg: '5xl', xl: '6xl' }}
            textAlign="center"
            fontWeight="bold"
            mt={{ base: '12', xl: '16' }}
            color="white"
          >
            Página não encontrada
          </Text>
        </Flex>

        <Flex
          align="center"
          justify="space-evenly"
          as="button"
          bgColor="gray.700"
          w={{ base: '60', md: '72', lg: '96' }}
          h={{ base: '14', lg: '16' }}
          p="2"
          fontSize={{ base: 'md', md: 'lg', lg: 'xl', xl: '2xl' }}
          borderRadius="0.625rem"
          mt={{ md: '12', lg: '28', xl: '32' }}
          _hover={{
            transition: 0.2,
            filter: 'brightness(0.9)',
            textDecoration: 'none',
            color: 'green.300',
          }}
          onClick={() => Router.push('/workouts')}
        >
          <RiHomeLine fontSize="1.75rem" />
          Voltar para o Início
        </Flex>
      </Flex>
    </>
  );
}
