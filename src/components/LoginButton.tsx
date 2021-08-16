import { Flex } from '@chakra-ui/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { useAuth } from '../hooks/useAuth';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  marginTop?: string;
}

export function LoginButton({ children, marginTop }: ButtonProps) {
  const { handleLogin } = useAuth();

  async function login() {
    await handleLogin();
  }

  return (
    <Flex
      as="button"
      marginTop={marginTop}
      bgColor="gray.700"
      width={{ base: '2xs', md: 'xs', lg: 'sm' }}
      height={{ base: '14', md: '16' }}
      align="center"
      justify="space-evenly"
      fontWeight="medium"
      fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
      borderRadius="xl"
      _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
      onClick={login}
    >
      {children}
    </Flex>
  );
}
