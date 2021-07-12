/* eslint-disable no-use-before-define */
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiMenuLine, RiLogoutBoxRLine, RiUser3Fill } from 'react-icons/ri';

import { useSidebarDrawer } from '../contexts/SidebarDrawerContent';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabase';

type LoggedUserType = {
  name?: string;
  email?: string;
  avatar_url?: string;
};

export function Header() {
  const { user } = useAuth();
  const { onOpen } = useSidebarDrawer();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const [loggedUser, setLoggedUser] = useState<LoggedUserType>();

  useEffect(() => {
    setLoggedUser({
      name: user?.user_metadata.full_name,
      email: user?.email,
      avatar_url: user?.user_metadata.avatar_url,
    });
  }, [
    user?.user_metadata.full_name,
    user?.email,
    user?.user_metadata.avatar_url,
  ]);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      Router.push('/');
      toast.success('Logout realizado');
    } catch (error) {
      toast.error('Erro ao realizar o logout. Tente mais tarde');
      throw error;
    }
  }

  return (
    <Flex
      mt={{ base: '2', md: '4', xl: '12' }}
      mb="16"
      mx={{ base: '6', md: '8', lg: '12', xl: '24' }}
      justifyContent="space-between"
      align="center"
    >
      {!isMobile && (
        <Image
          src="/images/logo.svg"
          w={{ md: '72', lg: '80', xl: '96' }}
          alt="shape.it"
        />
      )}

      {isMobile && (
        <Image src="/images/logo-mobile.svg" w="32" alt="shape.it" />
      )}

      {!isMobile && (
        <Flex align="center">
          <Box mr={{ md: '4', lg: '7' }}>
            <Text
              textAlign="right"
              color="gray.50"
              fontSize={{ md: 'lg', lg: 'xl', xl: '2xl' }}
            >
              {loggedUser?.name}
            </Text>
            <Text
              textAlign="right"
              color="gray.100"
              fontSize={{ md: 'md', lg: 'lg', xl: 'xl' }}
            >
              {loggedUser?.email}
            </Text>
          </Box>

          {loggedUser?.avatar_url ? (
            <Image
              src={loggedUser?.avatar_url}
              alt={loggedUser?.name}
              borderRadius="full"
              boxSize={{ base: '12', md: '14', lg: '16', xl: '20' }}
              mr={{ md: '4', lg: '6', xl: '8' }}
            />
          ) : (
            <IconButton
              border="0"
              background="none"
              w="14"
              h="14"
              mr="4"
              aria-label="Usuário"
              icon={<RiUser3Fill fontSize="2rem" />}
            />
          )}

          <IconButton
            border="0"
            background="none"
            borderRadius="6"
            w="14"
            h="14"
            _hover={{
              transition: 0.2,
              filter: 'brightness(0.9)',
              background: 'gray.700',
            }}
            onClick={handleLogout}
            aria-label="Sair"
            icon={<RiLogoutBoxRLine fontSize="2rem" />}
          />
        </Flex>
      )}

      {isMobile && (
        <Grid templateColumns="repeat(3, 1fr)">
          {loggedUser?.avatar_url ? (
            <Image
              src={loggedUser?.avatar_url}
              alt={loggedUser?.name}
              borderRadius="full"
              boxSize={{ base: '12', md: '14', lg: '16', xl: '20' }}
              mr={{ md: '4', lg: '6', xl: '8' }}
            />
          ) : (
            <IconButton
              border="0"
              background="none"
              w="14"
              h="14"
              mr="4"
              aria-label="Usuário"
              icon={<RiUser3Fill fontSize="2rem" />}
            />
          )}

          <IconButton
            border="0"
            background="none"
            borderRadius="6"
            w="14"
            h="14"
            _hover={{
              transition: 0.2,
              filter: 'brightness(0.9)',
              background: 'gray.700',
            }}
            onClick={onOpen}
            aria-label="Abrir menu"
            icon={<RiMenuLine fontSize="2rem" />}
          />

          <IconButton
            border="0"
            background="none"
            borderRadius="6"
            w="14"
            h="14"
            _hover={{
              transition: 0.2,
              filter: 'brightness(0.9)',
              background: 'gray.700',
            }}
            onClick={handleLogout}
            aria-label="Sair"
            icon={<RiLogoutBoxRLine fontSize="2rem" />}
          />
        </Grid>
      )}
    </Flex>
  );
}
