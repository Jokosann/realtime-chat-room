'use client';

import { ChatList } from '@/components/chat//ChatList';
import InputMessage from '@/components/chat/InputMessage';
import HeaderProfile from '@/components/chat/HeaderProfile';
import HeaderTitle from '@/components/chat/HeaderTitle';
import { CreateUserModal } from '@/components/chat/CreateUserModal';
import userSession from '@/lib/session';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const user = useSession();
    const router = useRouter();

    useEffect(() => {
        if (user.status === 'authenticated') {
            router.refresh();
        }
    }, [router, user]);

    return (
        <section>
            <div className="max-w-4xl m-auto p-4">
                {user.data?.user && (
                    <div className="mb-6">
                        <HeaderProfile />
                    </div>
                )}
                <div className="mb-6">
                    <HeaderTitle />
                </div>
                <ChatList />
                {user.data?.user && (
                    <div className="py-4">
                        <InputMessage />
                    </div>
                )}
                {!user.data?.user && (
                    <div className="w-full flex justify-center py-4">
                        <CreateUserModal />
                    </div>
                )}
            </div>
        </section>
    );
}
