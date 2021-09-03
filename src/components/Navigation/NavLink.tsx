/* eslint-disable no-use-before-define */
import {
  Text,
  Link as ChakraLink,
  Icon,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import React, { ElementType } from 'react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="2.5rem" />
        <Text
          ml="3.5"
          fontWeight="medium"
          fontSize={{ base: 'md', lg: 'lg', xl: 'xl' }}
        >
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
