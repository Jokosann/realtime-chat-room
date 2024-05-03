'use client';

import { ChatList } from '@/components/chat//ChatList';
import InputMessage from '@/components/chat/InputMessage';
import HeaderProfile from '@/components/chat/HeaderProfile';
import HeaderTitle from '@/components/chat/HeaderTitle';
import { CreateUserModal } from '@/components/chat/CreateUserModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClientSession } from '@/lib/session';
import { Skeleton } from '@/components/shadcn/ui/skeleton';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const user = useClientSession();
    const router = useRouter();

    useEffect(() => {
        if (user.status === 'authenticated') {
            router.refresh();
            setLoading(false);
        } else {
            setLoading(false);
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
                {loading && (
                    <div className="flex items-center space-x-4 mb-6">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
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
