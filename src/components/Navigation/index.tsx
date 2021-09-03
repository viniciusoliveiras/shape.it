/* eslint-disable no-use-before-define */
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { RiCloseLine, RiMenuLine } from 'react-icons/ri';

import { NavStack } from './NavStack';

export function Navigation() {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              p="2"
              border="0"
              backgroundColor="gray.700"
              borderRadius="6"
              justifyContent="center"
              alignItems="center"
              _hover={{
                transition: 0.2,
                filter: 'brightness(1.5)',
                background: 'gray.700',
              }}
              _expanded={{ bg: 'gray.900' }}
              fontSize={{ base: '3xl', lg: '4xl', xl: '5xl' }}
            >
              {isOpen ? <RiCloseLine /> : <RiMenuLine />}
            </MenuButton>
            <MenuList backgroundColor="gray.900" border="0">
              <MenuItem
                _hover={{
                  transition: 0.2,
                  filter: 'brightness(1.5)',
                  color: 'gray.900',
                  fontWeight: '800',
                }}
                _focus={{ bg: 'gray.900' }}
              >
                <NavStack />
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    );
  }

  return <NavStack />;
}
