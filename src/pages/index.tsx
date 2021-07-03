import { Flex, Box, Text, Image } from '@chakra-ui/react';
import Head from 'next/head';

import { LoginButton } from '../components/LoginButton';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
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
          <Image src="/images/logo.svg" alt="shape.it logo" />

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
      </Flex>
    </>
  );
}
