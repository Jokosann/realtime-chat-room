import { getServerSession } from 'next-auth';
import { authOPtions } from './auth-options';

export default async function userSession() {
    const session = await getServerSession(authOPtions);
    return session?.user;
}
