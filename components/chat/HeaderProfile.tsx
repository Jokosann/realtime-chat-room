'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { ExitIcon } from '@radix-ui/react-icons';
import Verified from './Verified';

export default function HeaderProfile() {
    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex gap-1 items-center">
                        <p className="text-sm font-medium">Joko Santoso</p>
                        <Verified />
                    </div>
                    <p className="text-xs">ID : 236ds9d6s</p>
                </div>
            </div>
            <Button variant="ghost" className="text-red-500 hover:text-red-500">
                <span className="text-sm">Sign Out</span> <ExitIcon className="ml-2" />
            </Button>
        </div>
    );
}
