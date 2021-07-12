/* eslint-disable no-use-before-define */
import { Flex, Box, Text, Image, useBreakpointValue } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

import { LoginButton } from '../components/LoginButton';

export default function Home() {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const buttonMarginTop = useBreakpointValue({
    base: '20',
    md: '28',
    xl: '32',
  });

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
        px={{ base: '12', md: '8', lg: '16', xl: '0' }}
      >
        <Box>
          {!isMobile && (
            <Image
              src="/images/logo.svg"
              w={{ md: 'xs', lg: 'sm', xl: 'lg' }}
              alt="shape.it logo"
            />
          )}

          {isMobile && (
            <Image src="/images/logo-mobile.svg" alt="shape.it logo" />
          )}

          <Text
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
            w={{ base: '2xs', md: 'xs', lg: 'auto' }}
            maxW={{ base: '100%', lg: 'lg', xl: 'xl' }}
            lineHeight={{ base: '3rem', lg: '4rem', xl: '5rem' }}
            fontWeight="semibold"
            color="white"
            marginTop={{ base: '36', md: '12' }}
          >
            Salve e gerencie seus treinos com facilidade.
          </Text>

          <LoginButton type="button" marginTop={buttonMarginTop}>
            <Image
              src="/images/google-logo.svg"
              boxSize={{ base: '6', lg: '8' }}
              alt="G"
            />
            Login com o Google
          </LoginButton>
        </Box>

        {!isMobile && (
          <Image
            src="/images/weightlifting.png"
            boxSize={{ md: '2xs', lg: 'xs', xl: 'sm' }}
            alt="Levantamento de peso"
          />
        )}
      </Flex>
    </>
  );
}
