'use client';

import { createContext, useContext, type ReactNode } from 'react';

const CrawlModeContext = createContext(false);

/** Server-detected crawler mode — skip decorative generation animations. */
export function CrawlModeProvider({
  isBot,
  children,
}: {
  isBot: boolean;
  children: ReactNode;
}) {
  return (
    <CrawlModeContext.Provider value={isBot}>
      {children}
    </CrawlModeContext.Provider>
  );
}

export function useCrawlMode(): boolean {
  return useContext(CrawlModeContext);
}
