'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { ExitIcon } from '@radix-ui/react-icons';
import Verified from './Verified';
import { signOut, useSession } from 'next-auth/react';

export default function HeaderProfile() {
    const { data }: any = useSession();

    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage src={`${data?.user?.image}`} className="object-cover" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex gap-1 items-center">
                        <p className="text-base font-medium">{data?.user?.name}</p>
                        <Verified />
                    </div>
                    <p className="text-xs">ID : {data?.user?.user_id}</p>
                </div>
            </div>
            <Button
                variant="ghost"
                className="text-red-500 hover:text-red-500"
                onClick={async () => await signOut()}
            >
                <span className="text-sm">Sign Out</span> <ExitIcon className="ml-2" />
            </Button>
        </div>
    );
}
