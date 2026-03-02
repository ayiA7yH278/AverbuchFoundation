import { createContext, useContext } from 'react';
import type { Business } from '@/data/businesses';

export const BusinessContext = createContext<Business | null>(null);

export function useBusiness(): Business {
  const ctx = useContext(BusinessContext);
  if (!ctx) throw new Error('useBusiness must be used within a BusinessContext provider');
  return ctx;
}
