import { NextPage } from 'next';
import { Box, ChakraProvider } from '@chakra-ui/react';
import colorTheme from '../theme';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: { Component: NextPage, pageProps: any }) => {
  return (
    <ChakraProvider theme={colorTheme}>
      <Box mx={'auto'}
        width={'100%'} maxW={{ base: 'unset', lg: '1200px' }}
        minH={'100%'}
        px={5}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider >
  );
}

export default MyApp;
