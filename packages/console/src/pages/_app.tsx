import { EmotionCache } from '@emotion/react';
import { AppProps as BaseAppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useMemo } from 'react';
import { theme } from '~/configs';
import createEmotionCache from '~/configs/createEmotionCache';
import useUrlQuery from '~/hooks/useUrlQuery';

const Main = dynamic(() => import('~/components/app/Main'), { ssr: false });

export type AppProps = BaseAppProps & {
  emotionCache?: EmotionCache;
};

const App = ({
  Component,
  emotionCache = createEmotionCache(),
  pageProps,
}: AppProps) => {
  const query = useUrlQuery();
  const cacheBusting = query._?.[0];

  const viewportScale = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    const screenWidth = window.screen.width;

    if (screenWidth >= 1024) return 1;
    return screenWidth / 1024;
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={theme.palette.primary.main} />

        <meta
          name="viewport"
          content={`width=device-width, initial-scale=${viewportScale}`}
        />
        <meta name="app-release" content={process.env.APP_RELEASE} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Sample Analytics</title>
      </Head>

      <Main emotionCache={emotionCache}>
        <Component key={cacheBusting} {...pageProps} />
      </Main>
    </>
  );
};
export default App;
