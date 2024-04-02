import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type HistoryContext = {
  history: string[];
};

const Context = createContext<HistoryContext | null>(null);

const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const router = useRouter();
  const [contextValue, setContextValue] = useState<HistoryContext>({
    history: [],
  });

  // https://github.com/vercel/next.js/discussions/16337#discussioncomment-563390
  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (!shallow) {
        setContextValue((prevState) => ({
          history: [...prevState.history, url],
        }));
      }
    };

    router.beforePopState(() => {
      setContextValue((prevState) => ({
        history: prevState.history.slice(0, -1),
      }));
      return true;
    });

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useHistory = (): HistoryContext => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export default HistoryProvider;
