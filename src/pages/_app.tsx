/* eslint-disable no-use-before-define */
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            className: '',
            duration: 5000,
            style: {
              background: '#E1E1E6',
              color: '#121414',
            },
            success: {
              duration: 3000,
              style: {
                background: '#61dcfb',
              },
              iconTheme: {
                primary: 'transparent',
                secondary: 'transparent',
              },
            },
            error: {
              duration: 3000,
              style: {
                background: '#fb6161',
              },
              iconTheme: {
                primary: 'transparent',
                secondary: 'transparent',
              },
            },
          }}
        />
      </ChakraProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
