/* eslint-disable no-use-before-define */
import React from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { Box, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export function Header() {
  const router = useRouter();

  return (
    <Flex mt="12" mb="16" mx="24" justifyContent="space-between" align="center">
      <Image src="/images/logo.svg" alt="shape.it" />

      <Flex align="center">
        <Box mr="7">
          <Text textAlign="right" color="gray.50" fontSize="2xl">
            Vinícius Oliveira
          </Text>
          <Text textAlign="right" color="gray.100" fontSize="xl">
            vinitag190@gmail.com
          </Text>
        </Box>
        <Image
          src="https://lh3.googleusercontent.com/ogw/ADea4I7RID_IdqOzX8ljxTzPUj2kHiUYQqO9lsSO9rk5oHY=s83-c-mo"
          alt="Vinícius Oliveira"
          borderRadius="full"
          boxSize="20"
        />
        <Box
          as="button"
          border="0"
          background="none"
          ml="8"
          width="14"
          height="14"
          borderRadius="6"
          _hover={{
            opacity: '0.9',
            background: 'gray.700',
          }}
          onClick={() => router.push('/')}
        >
          <Icon as={RiLogoutBoxRLine} fontSize="2.5rem" />
        </Box>
      </Flex>
    </Flex>
  );
}
