'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect when the component has hydrated on the client.
 * Use this to prevent hydration mismatches with persisted Zustand stores.
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
