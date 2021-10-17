/* eslint-disable no-use-before-define */
import {
  Flex,
  Image,
  IconButton,
  useBreakpointValue,
  Text,
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiLogoutBoxRLine, RiMenuLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks/useAuth';
import { supabase } from '../services/supabase';

type LoggedUserType = {
  name?: string;
  email?: string;
  avatar_url?: string;
};

export function Header() {
  const { user } = useAuth();
  const router = useRouter();

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

      {loggedUser && (
        <HStack spacing={['4', '6']} color="blue.500">
          <Flex align="center" borderRightWidth={1} borderColor="gray.700">
            <Flex
              flexDir="column"
              textAlign="right"
              fontSize="14"
              display={{ base: 'none', md: 'flex' }}
            >
              <Text>{loggedUser?.name}</Text>
              <Text color="gray.100">{loggedUser?.email}</Text>
            </Flex>

            <Avatar
              src={loggedUser?.avatar_url}
              name={loggedUser?.name}
              mx={['4', '6']}
            />
          </Flex>

          <Menu>
            <Tooltip label="Menu" aria-label="Menu" placement="top">
              <MenuButton
                as={IconButton}
                aria-label="Menu"
                icon={<RiMenuLine />}
                variant="ghost"
                colorScheme="blue"
              />
            </Tooltip>

            <MenuList>
              <MenuItem color="white" onClick={() => router.push('/workouts')}>
                Treinos
              </MenuItem>

              <MenuItem
                color="white"
                onClick={() => router.push('/new-workout')}
              >
                Criar novo treino
              </MenuItem>
            </MenuList>
          </Menu>

          <Tooltip label="Sair" aria-label="Sair" placement="top">
            <IconButton
              icon={<RiLogoutBoxRLine />}
              aria-label="Logout"
              variant="ghost"
              colorScheme="blue"
              onClick={() => handleLogout()}
            />
          </Tooltip>
        </HStack>
      )}
    </Flex>
  );
}
