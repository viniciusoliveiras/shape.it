/* eslint-disable no-use-before-define */
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from '../contexts/AuthContext';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContent';
import { theme } from '../styles/theme';
import '../styles/input.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              className: '',
              duration: 4000,
              style: {
                background: '#E1E1E6',
                color: '#121414',
              },
              success: {
                duration: 2500,
                style: {
                  background: '#61dcfb',
                },
                iconTheme: {
                  primary: 'transparent',
                  secondary: 'transparent',
                },
              },
              error: {
                duration: 2500,
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
        </SidebarDrawerProvider>
      </ChakraProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
