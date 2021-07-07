import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContent';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    md: false,
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
            <DrawerHeader fontSize="3xl">Navegação</DrawerHeader>

            <DrawerBody mt="6">
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}
