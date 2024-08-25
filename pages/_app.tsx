import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import '../styles/global.css';
import { useStore } from '../utils/store';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { user, setUser } = useStore();

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;