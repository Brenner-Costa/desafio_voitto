import React from 'react';
import { AppProps } from 'next/app';

import GlobalStyle from '@/styles/globals';
import Navbar from '@/components/Organisms/Navbar';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
    <Navbar title={'Desafio Voitto'}/>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
};

export default MyApp;
