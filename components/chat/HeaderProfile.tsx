'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { DragHandleDots2Icon, ExitIcon, UpdateIcon } from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';
import { useClientSession } from '@/lib/session';
import { UpdateUserModal } from './UpdateUserModal';
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

export default function HeaderProfile() {
  const session = useClientSession();
  const { image, name, id }: any = session?.data?.user;

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src={`${image}`} className="object-cover" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-1 items-center">
            <p className="text-base font-medium">{name}</p>
          </div>
          <p className="text-xs">ID : {id}</p>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <DragHandleDots2Icon className="w-7 h-7" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2 mr-4 w-fit p-2">
          <UpdateUserModal />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-red-500 hover:text-red-500 w-fit">
                <span className="text-sm">sign out</span> <ExitIcon className="ml-2" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your
                  data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={async () => await signOut()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>
    </div>
  );
}
