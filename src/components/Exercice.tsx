/* eslint-disable no-use-before-define */
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export function Exercice() {
  return (
    <Flex
      flexDirection="column"
      bgColor="gray.700"
      borderRadius="1rem"
      px={{ base: '4', md: '6', lg: '8', xl: '12' }}
      py={{ base: '3', md: '5', lg: '7', xl: '9' }}
      h="32"
      justify="center"
      _hover={{ transition: 0.2, filter: 'brightness(0.9)', cursor: 'pointer' }}
    >
      <Flex justify="space-around" align="center">
        <Text
          fontWeight="medium"
          fontSize={{ base: 'xl', lg: '2xl', xl: '3xl' }}
          color="white"
        />
        <Text fontSize={{ base: 'sm', lg: 'lg', xl: 'xl' }} color="blue.500" />
      </Flex>
      <Text
        maxW="96"
        textAlign="center"
        mt="5"
        fontWeight="medium"
        fontSize={{ base: 'sm', lg: 'lg', xl: 'xl' }}
        alignSelf="center"
      />
    </Flex>
  );
}
