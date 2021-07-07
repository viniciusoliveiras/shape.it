import { Grid } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WorkoutGridProps {
  children: ReactNode;
}

export function WorkoutGrid({ children }: WorkoutGridProps) {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={{ base: '4', lg: '6', xl: '10' }}
      width="100%"
    >
      {children}
    </Grid>
  );
}
