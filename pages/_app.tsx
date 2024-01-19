import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/services/store';
import '@/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Todo App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
