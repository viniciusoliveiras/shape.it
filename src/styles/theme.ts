import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '64em',
  xl: '90em',
});

export const theme = extendTheme({
  colors: {
    gray: {
      '50': '#e1e1e6' /* title */,
      '100': '#cbd5e0' /* text */,
      '200': '#51595B',
      '700': '#292b2b' /* shape */,
      '900': '#121414' /* background */,
    },
    yellow: {
      '500': '#eba417',
    },
    blue: {
      '500': '#61dcfb',
    },
    green: {
      '500': '#04d361',
    },
    red: {
      '500': '#FB6161',
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
  breakpoints,
});
