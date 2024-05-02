'use client';

import { ScrollArea } from '@/components/shadcn/ui/scroll-area';
import ChatItemLeft from './ChatItemLeft';
import ChatItemRight from './ChatItemRight';

export function ChatList() {
    return (
        <ScrollArea className="w-full md:h-[65vh] h-[60vh] overflow-y-auto scroll-smooth border-b border-neutral-200 pb-2">
            <div className="pr-4 mb-4 h-fit space-y-6">
                <ChatItemLeft />
                <ChatItemRight />
            </div>
        </ScrollArea>
    );
}
