import { useSession } from 'next-auth/react';

export function useClientSession() {
  const session = useSession();
  return session;
}
