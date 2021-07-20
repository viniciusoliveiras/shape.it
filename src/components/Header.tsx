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

      {!isMobile && (
        <>
          <Navigation />

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
        </>
      )}

      {isMobile && (
        <>
          <Navigation />
          <Grid templateColumns="repeat(3, 1fr)" gap="1">
            {loggedUser?.avatar_url ? (
              <Image
                src={loggedUser?.avatar_url}
                alt={loggedUser?.name}
                borderRadius="full"
                boxSize="10"
                mr={{ md: '4', lg: '6', xl: '8' }}
              />
            ) : (
              <IconButton
                border="0"
                background="none"
                w="10"
                h="10"
                mr="4"
                aria-label="Usuário"
                icon={<RiUser3Fill fontSize="2rem" />}
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
              onClick={onOpen}
              aria-label="Abrir menu"
              icon={<RiMenuLine fontSize="2rem" />}
            />

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
              icon={<RiLogoutBoxRLine fontSize="2rem" />}
            />
          </Grid>
        </>
      )}
    </Flex>
  );
}
