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

import { useAuth } from '../hooks/useAuth';
import { useSidebarDrawer } from '../hooks/useSidebarDrawer';
import { supabase } from '../services/supabase';
import { Navigation } from './Navigation';

type LoggedUserType = {
  name?: string;
  email?: string;
  avatar_url?: string;
};

export function Header() {
  const { user, setLoading } = useAuth();
  const { onOpen } = useSidebarDrawer();
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  const showFullLogo = useBreakpointValue({
    base: false,
    md: true,
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
      setLoading(true);
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
      py="4"
      px={{ base: '6', md: '8', lg: '12', xl: '24' }}
      justifyContent="space-between"
      align="center"
      bgColor="gray.700"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1"
      boxShadow="rgb(18 18 20) 0px 1rem 2rem"
    >
      {showFullLogo ? (
        <Image
          src="/images/logo.svg"
          w={{ base: '32', md: '40', lg: '48', xl: '60' }}
          alt="shape.it"
        />
      ) : (
        <Image src="/images/mobile-logo.svg" w="20" alt="shape.it" />
      )}

      <Navigation />

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={{ base: '3', md: '6', lg: '9' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isMobile && (
          <IconButton
            border="0"
            background="none"
            borderRadius="6"
            w="10"
            h="10"
            _hover={{
              transition: 0.2,
              filter: 'brightness(0.9)',
              background: 'gray.700',
            }}
            onClick={onOpen}
            aria-label="Abrir menu"
            fontSize={{ base: '3xl', lg: '4xl', xl: '5xl' }}
            icon={<RiMenuLine />}
          />
        )}

        <IconButton
          border="0"
          background="none"
          borderRadius="6"
          w="10"
          h="10"
          _hover={{
            transition: 0.2,
            filter: 'brightness(0.9)',
            background: 'gray.700',
          }}
          onClick={handleLogout}
          aria-label="Sair"
          fontSize={{ base: '3xl', lg: '4xl', xl: '5xl' }}
          icon={<RiLogoutBoxRLine />}
        />

        {loggedUser?.avatar_url ? (
          <Image
            src={loggedUser?.avatar_url}
            alt={loggedUser?.name}
            borderRadius="full"
            boxSize={{ base: '10', lg: '12', xl: '14' }}
          />
        ) : (
          <IconButton
            border="0"
            background="none"
            w="10"
            h="10"
            aria-label="Usuário"
            fontSize={{ base: '3xl', lg: '4xl', xl: '5xl' }}
            icon={<RiUser3Fill />}
          />
        )}
      </Grid>
    </Flex>
  );
}
