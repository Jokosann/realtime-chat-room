'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import Reply from './Reply';
import { IMessage } from '@/types/chat-message';
import { Dispatch, SetStateAction } from 'react';
import { formatDistanceToNow } from 'date-fns';
interface IPropsChat {
  chat: IMessage;
  setReply: Dispatch<
    SetStateAction<{
      isReply: boolean;
      name: string;
    }>
  >;
}

export default function ChatItemLeft({ chat, setReply }: IPropsChat) {
  const time = formatDistanceToNow(new Date(chat.created_at), { addSuffix: true });

  const handleReply = (name: string) => {
    setReply({ isReply: true, name: name });
  };

  return (
    <div className="w-full flex gap-3">
      <Avatar>
        <AvatarImage src={chat.image} className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full mr-4">
        <div className="flex gap-3 items-center mb-1">
          <div className="flex gap-1 items-center">
            <p className="text-sm">{chat.name}</p>
          </div>
          <span className="text-slate-400 text-xs">{time}</span>
        </div>
        <div className="flex gap-1">
          <div className="bg-neutral-100 py-2 px-3 rounded-tr-lg rounded-br-lg rounded-bl-lg">
            <p className="text-base font-default text-neutral-700">
              <span className="text-teal-500">{chat.is_replay && `@${chat.reply_to}`}</span> {chat.text}
            </p>
          </div>
          <div className="w-20 flex items-center">
            <div className="cursor-pointer p-2" onClick={() => handleReply(chat.name)}>
              <Reply />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
