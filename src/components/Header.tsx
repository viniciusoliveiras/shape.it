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
import React from 'react';
import { RiMenuLine, RiLogoutBoxRLine } from 'react-icons/ri';

import { useSidebarDrawer } from '../contexts/SidebarDrawerContent';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { signOut, user } = useAuth();
  const { onOpen } = useSidebarDrawer();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  async function handleLogout() {
    await signOut();
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
              {user?.name}
            </Text>
            <Text
              textAlign="right"
              color="gray.100"
              fontSize={{ md: 'md', lg: 'lg', xl: 'xl' }}
            >
              {user?.email}
            </Text>
          </Box>

          <Image
            src={user?.avatar}
            alt={user?.name}
            borderRadius="full"
            boxSize={{ base: '12', md: '14', lg: '16', xl: '20' }}
            mr={{ md: '4', lg: '6', xl: '8' }}
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
        </Flex>
      )}

      {isMobile && (
        <Grid templateColumns="repeat(3, 1fr)">
          <Image
            src={user?.avatar}
            alt={user?.name}
            borderRadius="full"
            boxSize={{ base: '12', md: '14', lg: '16', xl: '20' }}
            mr={{ md: '4', lg: '6', xl: '8' }}
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
