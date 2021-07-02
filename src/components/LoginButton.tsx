import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  marginTop?: string;
}

export function LoginButton({ children, marginTop }: ButtonProps) {
  const router = useRouter();

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
      onClick={() => router.push('/workouts')}
    >
      {children}
    </Flex>
  );
}
