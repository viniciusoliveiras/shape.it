import { Flex } from '@chakra-ui/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { supabase } from '../services/supabase';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  marginTop?: string;
}

export function LoginButton({ children, marginTop }: ButtonProps) {
  async function handleLogin() {
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });

    if (error) {
      throw new Error(`${error}`);
    }
  }

  return (
    <Flex
      as="button"
      marginTop={marginTop}
      bgColor="gray.700"
      width={{ base: '2xs', md: 'xs', lg: 'sm' }}
      height={{ base: '12', md: '16' }}
      align="center"
      justify="space-evenly"
      fontWeight="medium"
      fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
      borderRadius="xl"
      _hover={{ transition: 0.2, filter: 'brightness(0.9)' }}
      onClick={handleLogin}
    >
      {children}
    </Flex>
  );
}
