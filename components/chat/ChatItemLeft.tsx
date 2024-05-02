'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import Verified from './Verified';
import Reply from './Reply';

export default function ChatItemLeft() {
    return (
        <div className="w-full flex gap-3">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full mr-4">
                <div className="flex gap-3 items-center mb-2">
                    <div className="flex gap-1 items-center">
                        <p className="text-sm">Joko Santoso</p>
                        <Verified />
                    </div>
                    <span className="text-slate-400 text-xs">2 days ago</span>
                </div>
                <div className="flex gap-2">
                    <div className="bg-neutral-100 p-2 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                        <p className="text-base font-default text-neutral-700">
                            Hi guys!! Thanks for visiting my website. Please leave your impression or
                            suggestion about this website here
                        </p>
                    </div>
                    <div className="w-20 flex items-center">
                        <div className="cursor-pointer p-2">
                            <Reply rotate="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
