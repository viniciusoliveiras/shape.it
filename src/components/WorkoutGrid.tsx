import { Grid } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WorkoutGridProps {
  children: ReactNode;
}

export function WorkoutGrid({ children }: WorkoutGridProps) {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="10" width="100%">
      {children}
    </Grid>
  );
}
