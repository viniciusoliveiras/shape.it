import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  marginTop?: string;
}

export function LoginButton({ children, marginTop }: ButtonProps) {
<<<<<<< HEAD
  const { signInWithGoogle, user, signOut } = useAuth();

  function handleLogin() {
    if (!user) {
      signInWithGoogle();
    }

    if (user) {
      signOut();
    }
  }
=======
  const router = useRouter();
>>>>>>> feature/header-component

  return (
    <Flex
      as="button"
      marginTop={marginTop}
      bgColor="gray.700"
      width="sm"
      height="4.375rem"
      align="center"
      justify="space-evenly"
      fontWeight="medium"
      fontSize="2xl"
      borderRadius="xl"
      _hover={{
        opacity: '0.8',
      }}
<<<<<<< HEAD
      onClick={handleLogin}
=======
      onClick={() => router.push('/workouts')}
>>>>>>> feature/header-component
    >
      {children}
    </Flex>
  );
}
