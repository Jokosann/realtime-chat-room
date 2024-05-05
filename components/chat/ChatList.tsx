'use client';

import { ScrollArea } from '@/components/shadcn/ui/scroll-area';
import ChatItemLeft from './ChatItemLeft';
import ChatItemRight from './ChatItemRight';
import { IMessage } from '@/types/chat-message';
import { useClientSession } from '@/lib/session';

interface IPropsChatList {
  messages: IMessage[];
}

export function ChatList({ messages }: IPropsChatList) {
  const user = useClientSession();
  return (
    <ScrollArea className="w-full md:h-[65vh] h-[60vh] overflow-y-auto scroll-smooth border-b border-neutral-200 pb-2">
      <div className="pr-4 mb-4 h-fit space-y-6">
        {messages?.map((chat) => (
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
}
