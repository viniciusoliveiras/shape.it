import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { MdFitnessCenter, MdAdd, MdOutlineLogout } from 'react-icons/md';
import { toast } from 'react-toastify';

import { supabase } from 'services/supabase';

export function Footer() {
  const { asPath, push } = useRouter();

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      push('/');
      toast.success('Logout realizado');
      destroyCookie(null, 'shape-it.user-id', { path: '/' });
      destroyCookie(null, 'shape-it.access-token', { path: '/' });
    } catch (error) {
      toast.error('Erro ao realizar o logout. Tente mais tarde');
      throw error;
    }
  }

  return (
    <Flex
      py="2"
      px="6"
      position="fixed"
      left="0"
      bottom="0"
      bgColor="gray.700"
      w="100%"
      boxShadow="rgb(18 18 20) 2rem 0.5rem 2rem"
      display={{ base: 'flex', md: 'none' }}
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          fontSize="lg"
          color={asPath.startsWith('/workouts') ? 'green.300' : 'gray.50'}
          onClick={() => push('/workouts')}
        >
          <MdFitnessCenter fontSize="1.5rem" />
          <Text mt="2">Treinos</Text>
        </GridItem>

        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          fontSize="lg"
          color={asPath === '/new-workout' ? 'green.300' : 'gray.50'}
          onClick={() => asPath !== '/new-workout' && push('/new-workout')}
        >
          <MdAdd fontSize="1.5rem" />
          <Text mt="2" textAlign="center">
            Novo
          </Text>
        </GridItem>

        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          fontSize="lg"
          onClick={() => handleLogout()}
        >
          <MdOutlineLogout fontSize="1.5rem" />
          <Text mt="2">Sair</Text>
        </GridItem>
      </Grid>
    </Flex>
  );
}
