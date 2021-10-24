/* eslint-disable no-use-before-define */
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import { AuthContextProvider } from 'contexts/AuthContext';
import { DeleteExerciceModalContextProvider } from 'contexts/DeleteExerciceModal';
import { SidebarDrawerProvider } from 'contexts/SidebarDrawerContent';
import { queryClient } from 'services/queryClient';
import { theme } from 'styles/theme';
import 'styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SidebarDrawerProvider>
            <DeleteExerciceModalContextProvider>
              <Component {...pageProps} />

              <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                closeButton={false}
              />
            </DeleteExerciceModalContextProvider>
          </SidebarDrawerProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
