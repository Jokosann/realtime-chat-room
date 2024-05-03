'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { DragHandleDots2Icon, ExitIcon, UpdateIcon } from '@radix-ui/react-icons';
import Verified from './Verified';
import { signOut } from 'next-auth/react';
import { useClientSession } from '@/lib/session';
import { UpdateUserModal } from './UpdateUserModal';

export default function HeaderProfile() {
    const session = useClientSession();
    const { image, name, user_id }: any = session?.data?.user;

    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage src={`${image}`} className="object-cover" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex gap-1 items-center">
                        <p className="text-base font-medium">{name}</p>
                        <Verified />
                    </div>
                    <p className="text-xs">ID : {user_id}</p>
                </div>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost">
                        <DragHandleDots2Icon className="w-7 h-7" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 mr-4 w-fit p-4">
                    <UpdateUserModal />
                    <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-500 w-fit"
                        onClick={async () => await signOut()}
                    >
                        <span className="text-sm">Sign Out</span> <ExitIcon className="ml-2" />
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}
