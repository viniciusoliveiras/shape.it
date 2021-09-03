import { useContext } from 'react';

import { SidebarDrawerContext } from '../contexts/SidebarDrawerContent';

export function useSidebarDrawer() {
  const value = useContext(SidebarDrawerContext);

  return value;
}
