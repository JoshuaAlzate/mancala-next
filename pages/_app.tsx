import { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import colorTheme from '../theme';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: { Component: NextPage, pageProps: any }) => {
  return (
    <ChakraProvider theme={colorTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
