/* eslint-disable react/display-name */
'use client';

import { ScrollArea } from '@/components/shadcn/ui/scroll-area';
import ChatItemLeft from './ChatItemLeft';
import ChatItemRight from './ChatItemRight';
import { IMessage } from '@/types/chat-message';
import { useClientSession } from '@/lib/session';
import { forwardRef } from 'react';

interface IPropsChatList {
  messages: IMessage[];
}

export const ChatList = forwardRef<HTMLDivElement, IPropsChatList>(({ messages }, ref) => {
  const user = useClientSession();

  return (
    <ScrollArea>
      <div
        ref={ref}
        className="no-scrollbar mb-4 h-[60vh] space-y-6 overflow-y-auto scroll-smooth border-b border-neutral-200 pb-2 dark:border-neutral-700 md:h-[65vh]"
      >
        {messages?.map((chat: IMessage) => (
          <div key={chat.id}>
            {user?.data?.user?.name === chat.name ? (
              <ChatItemRight chat={chat} />
            ) : (
              <ChatItemLeft chat={chat} />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});
