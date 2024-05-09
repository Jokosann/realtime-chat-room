/* eslint-disable react/display-name */
'use client';

import { ScrollArea } from '@/components/shadcn/ui/scroll-area';
import ChatItemLeft from './ChatItemLeft';
import ChatItemRight from './ChatItemRight';
import { IMessage } from '@/types/chat-message';
import { useClientSession } from '@/lib/session';
import { Dispatch, SetStateAction, forwardRef } from 'react';

interface IPropsChatList {
  messages: IMessage[];
  setReply: Dispatch<
    SetStateAction<{
      isReply: boolean;
      name: string;
    }>
  >;
}

export const ChatList = forwardRef<HTMLDivElement, IPropsChatList>(({ messages, setReply }, ref) => {
  const user = useClientSession();

  if (messages.length < 1) return null;

  return (
    <ScrollArea>
      <div
        ref={ref}
        className={`no-scrollbar mb-4 w-full ${
          user.data?.user ? 'h-[58vh] md:h-[63vh]' : 'h-[63vh] md:h-[68vh]'
        } space-y-6 overflow-y-auto scroll-smooth border-b border-neutral-200 pb-2`}
      >
        {messages?.map((chat: IMessage) => (
          <div key={chat.id}>
            {user?.data?.user?.name === chat.name ? (
              <ChatItemRight chat={chat} />
            ) : (
              <ChatItemLeft chat={chat} setReply={setReply} />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});
