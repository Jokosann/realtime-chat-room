'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import Reply from './Reply';
import { IMessage } from '@/types/chat-message';

interface IpropsChat {
  chat: IMessage;
}

export default function ChatItemRight({ chat }: IpropsChat) {
  return (
    <div className="w-full flex gap-3">
      <div className="w-full ml-4">
        <div className="flex gap-3 items-center justify-end mb-2">
          <span className="text-slate-400 text-xs">2 days ago</span>
          <p className="text-sm">{chat.name}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="w-20 flex items-center justify-end">
            <div className="cursor-pointer p-2">
              <Reply rotate="rotate(180)" />
            </div>
          </div>
          <div className="bg-sky-500 p-2 rounded-tl-xl rounded-br-xl rounded-bl-xl">
            <p className="text-base font-default text-neutral-100">{chat.text}</p>
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
