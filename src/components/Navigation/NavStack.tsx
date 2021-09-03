import { HStack, Stack, useBreakpointValue } from '@chakra-ui/react';
import { RiClipboardLine, RiAddLine } from 'react-icons/ri';

import { NavLink } from './NavLink';

export function NavStack() {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (isMobile) {
    return (
      <Stack spacing="9" align="flex-start">
        <NavLink icon={RiClipboardLine} href="/workouts">
          Treinos
        </NavLink>

        <NavLink icon={RiAddLine} href="/new-workout">
          Novo treino
        </NavLink>
      </Stack>
    );
  }

  return (
    <HStack spacing="9" align="flex-start">
      <NavLink icon={RiClipboardLine} href="/workouts">
        Treinos
      </NavLink>

      <NavLink icon={RiAddLine} href="/new-workout">
        Novo treino
      </NavLink>
    </HStack>
  );
}
