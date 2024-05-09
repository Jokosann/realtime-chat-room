'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import app from '@/lib/firebase';
import { IMessage } from '@/types/chat-message';
import { formatDistanceToNow } from 'date-fns';
import { getDatabase, ref, remove } from 'firebase/database';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../shadcn/ui/alert-dialog';
import DeleteIcon from './DeleteIcon';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';

interface IpropsChat {
  chat: IMessage;
}

export default function ChatItemRight({ chat }: IpropsChat) {
  const date = formatDistanceToNow(new Date(chat.created_at), { addSuffix: true });
  const regex = /about\.?/g;
  const time = date.replace(regex, '');

  const db = getDatabase(app);

  const handleDelete = (id: string) => {
    const messageRef = ref(db, `messages/${id}`);
    if (messageRef) remove(messageRef);
    toast.success('Delete chat success');
  };

  return (
    <div className="w-full flex gap-3">
      <Toaster position="top-right" richColors />
      <div className="w-full ml-4">
        <div className="flex gap-2 items-end justify-end mb-2">
          <span className="text-slate-400 text-[11px]">{time}</span>
          <p className="text-sm">{chat.name}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="w-5 h-5 flex justify-center items-center cursor-pointer pt-1">
                <DeleteIcon />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete it?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your chat and remove your
                  data from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(chat.id)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="bg-teal-500 px-3 py-2 rounded-tl-xl rounded-br-xl rounded-bl-xl">
            <p className="text-base font-default text-neutral-100">
              <span className="text-teal-200">{chat.is_replay && `@${chat.reply_to}`}</span> {chat.text}
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
