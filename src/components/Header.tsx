/* eslint-disable no-use-before-define */
import {
  Box,
  Flex,
  Image,
  Text,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { useAuth } from '../hooks/useAuth';

export function Header() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  async function handleLogout() {
    signOut();

    router.push('/');
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

      <Flex align="center">
        {!isMobile && user && (
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
        )}

        {user && (
          <Image
            src={user?.avatar}
            alt={user?.name}
            borderRadius="full"
            boxSize={{ base: '12', md: '14', lg: '16', xl: '20' }}
          />
        )}

        <Box
          as="button"
          border="0"
          background="none"
          ml={{ md: '4', lg: '6', xl: '8' }}
          width="14"
          height="14"
          borderRadius="6"
          _hover={{
            opacity: '0.9',
            background: 'gray.700',
          }}
          onClick={handleLogout}
        >
          <Icon
            as={RiLogoutBoxRLine}
            fontSize={{ base: '1.5rem', md: '2rem', xl: '2.5rem' }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
