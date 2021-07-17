/* eslint-disable no-use-before-define */
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

import { useSidebarDrawer } from '../../hooks/useSidebarDrawer';
import { NavStack } from './NavStack';

export function Navigation() {
  const { isOpen, onClose } = useSidebarDrawer();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onClose();
        }}
      >
        <DrawerOverlay>
          <DrawerContent bg="gray.900" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader fontSize="2xl">Navegação</DrawerHeader>

            <DrawerBody mt="6">
              <NavStack />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return <NavStack />;
}
