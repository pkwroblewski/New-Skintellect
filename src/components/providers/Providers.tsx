'use client';

import { type ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers wrapper.
 * Zustand stores auto-initialize, so no explicit provider is needed.
 * This component serves as a boundary for client-side state.
 */
export function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
