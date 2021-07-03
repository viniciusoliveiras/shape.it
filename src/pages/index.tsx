<<<<<<< HEAD
import { Flex, Box, Text, Image } from '@chakra-ui/react';
=======
/* eslint-disable no-use-before-define */
import React from 'react';

import { Flex, Box, Text, Image, useBreakpointValue } from '@chakra-ui/react';
>>>>>>> feature/index-responsiveness
import Head from 'next/head';

import { LoginButton } from '../components/LoginButton';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
<<<<<<< HEAD
  const { user } = useAuth();
=======
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const buttonMarginTop = useBreakpointValue({ base: '20', md: '32' });

>>>>>>> feature/index-responsiveness
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
<<<<<<< HEAD
          <Image src="/images/logo.svg" alt="shape.it logo" />
=======
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
>>>>>>> feature/index-responsiveness

          <Text
            fontSize={{ base: '3xl', md: '4xl', lg: '6xl' }}
            w={{ base: '2xs', md: 'xs', lg: 'auto' }}
            maxW={{ base: '100%', lg: 'xl' }}
            lineHeight={{ base: '3rem', lg: '5rem' }}
            fontWeight="semibold"
            color="white"
            marginTop={{ base: '36', md: '12' }}
          >
            Salve e gerencie seus treinos com facilidade.
          </Text>

<<<<<<< HEAD
          {!user && (
            <LoginButton type="button" marginTop="32">
              <Image src="/images/google-logo.svg" alt="G" />
              Login com o Google
            </LoginButton>
          )}

          {user && (
            <LoginButton type="button" marginTop="32">
              <Image
                borderRadius="full"
                boxSize="50px"
                src={user.avatar}
                alt={user.name}
              />
              {user.name}
            </LoginButton>
          )}
        </Box>

        <Image src="/images/weightlifting.png" alt="Levantamento de peso" />
=======
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
>>>>>>> feature/index-responsiveness
      </Flex>
    </>
  );
}
