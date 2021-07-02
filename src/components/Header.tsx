/* eslint-disable no-use-before-define */
import { Box, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export function Header() {
  const router = useRouter();

  return (
    <Flex
      mt={{ md: '4', lg: '4', xl: '12' }}
      mb="16"
      mx={{ md: '8', lg: '12', xl: '24' }}
      justifyContent="space-between"
      align="center"
    >
      <Image
        src="/images/logo.svg"
        w={{ md: '72', lg: '80', xl: '96' }}
        alt="shape.it"
      />

      <Flex align="center">
        <Box mr={{ md: '4', lg: '7' }}>
          <Text
            textAlign="right"
            color="gray.50"
            fontSize={{ md: 'lg', lg: 'xl', xl: '2xl' }}
          >
            Vinícius Oliveira
          </Text>
          <Text
            textAlign="right"
            color="gray.100"
            fontSize={{ md: 'md', lg: 'lg', xl: 'xl' }}
          >
            vinitag190@gmail.com
          </Text>
        </Box>
        <Image
          src="https://lh3.googleusercontent.com/ogw/ADea4I7RID_IdqOzX8ljxTzPUj2kHiUYQqO9lsSO9rk5oHY=s83-c-mo"
          alt="Vinícius Oliveira"
          borderRadius="full"
          boxSize={{ md: '14', lg: '16', xl: '20' }}
        />
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
          onClick={() => router.push('/')}
        >
          <Icon as={RiLogoutBoxRLine} fontSize={{ md: '2rem', xl: '2.5rem' }} />
        </Box>
      </Flex>
    </Flex>
  );
}
