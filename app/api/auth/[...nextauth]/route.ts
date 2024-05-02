import { authOPtions } from '@/lib/auth-options';
import NextAuth from 'next-auth';

const handler = NextAuth(authOPtions);
export { handler as GET, handler as POST };
