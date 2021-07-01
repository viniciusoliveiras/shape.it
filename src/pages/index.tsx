/* eslint-disable no-use-before-define */
import React from 'react';

import { Flex, Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';

import googleLogoImg from '../../public/images/google-logo.svg';
import logoImg from '../../public/images/logo.svg';
import weightliftingImg from '../../public/images/weightlifting.png';
import { LoginButton } from '../components/LoginButton';

export default function Home() {
  return (
    <>
      <Head>
        <title>shape.it</title>
      </Head>

      <Flex
        h="100vh"
        maxWidth="6xl"
        margin="0 auto"
        justify="space-between"
        align="center"
        px="8"
      >
        <Box>
          <Image src={logoImg} alt="shape.it logo" />

          <Text
            fontSize="6xl"
            maxW="xl"
            lineHeight="5rem"
            fontWeight="semibold"
            color="white"
            marginTop="12"
          >
            Salve e gerencie seus treinos com facilidade.
          </Text>

          <LoginButton type="button" marginTop="32">
            <Image src={googleLogoImg} alt="G" />
            Login com o Google
          </LoginButton>
        </Box>

        <Image src={weightliftingImg} alt="Levantamento de peso" />
      </Flex>
    </>
  );
}
