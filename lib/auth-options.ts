import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createUserSession } from './action';

export const authOPtions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.SECRET_ID,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Jokombur' },
                image: { label: 'Profile', type: 'file' },
            },
            async authorize(credentials) {
                const data = credentials as {
                    username: string;
                    image: string;
                };
                const user: any = await createUserSession(data);
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account?.provider === 'credentials') {
                token.name = user.username;
                token.picture = user.image;
                token.user_id = user.user_id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if ('name' in token) {
                session.user.name = token.name;
            }
            if ('picture' in token) {
                session.user.image = token.picture;
            }
            if ('user_id' in token) {
                session.user.user_id = token.user_id;
            }
            return session;
        },
    },
};
