import { Stack } from '@chakra-ui/react';
import {
  RiClipboardLine,
  RiAddLine,
  RiAccountCircleLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';

export function SidebarNav() {
  return (
    <Stack spacing="9" align="flex-start">
      <NavLink icon={RiClipboardLine} href="/workouts">
        Treinos
      </NavLink>

      <NavLink icon={RiAddLine} href="/new-workout">
        Novo treino
      </NavLink>

      <NavLink icon={RiAccountCircleLine} href="/profile">
        Perfil
      </NavLink>
    </Stack>
  );
}
