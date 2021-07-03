import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
