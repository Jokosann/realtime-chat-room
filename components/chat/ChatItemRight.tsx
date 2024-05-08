'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { IMessage } from '@/types/chat-message';
import { formatDistanceToNow } from 'date-fns';

interface IpropsChat {
  chat: IMessage;
}

export default function ChatItemRight({ chat }: IpropsChat) {
  const time = formatDistanceToNow(new Date(chat.created_at), { addSuffix: true });

  return (
    <div className="w-full flex gap-3">
      <div className="w-full ml-4">
        <div className="flex gap-3 items-center justify-end mb-2">
          <span className="text-slate-400 text-xs">{time}</span>
          <p className="text-sm">{chat.name}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="bg-teal-500 px-3 py-2 rounded-tl-lg rounded-br-lg rounded-bl-lg">
            <p className="text-base font-default text-neutral-100">
              <span className="text-blue-700">{chat.is_replay && `@${chat.reply_to}`}</span> {chat.text}
            </p>
          </div>
        </div>
      </div>
      <Avatar>
        <AvatarImage src={chat.image} className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
