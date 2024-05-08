'use client';

import { Button } from '@/components/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { PlusIcon } from '@radix-ui/react-icons';
import { Card, CardContent } from '@/components/shadcn/ui/card';
import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import Spinner from './Spinner';
import { createUser } from '@/lib/action';
import { useClientSession } from '@/lib/session';

export function CreateUserModal() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [state, formAction] = useFormState(createUser, null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const user = useClientSession();

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file ? URL.createObjectURL(file || undefined) : undefined);
  };

  const ButtonSend = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} type="submit" className="w-full">
        {pending ? <Spinner /> : 'create'}
      </Button>
    );
  };

  useEffect(() => {
    if (state?.message === 'success') {
      if (formRef.current) {
        formRef.current.reset();
        setImage(undefined);
      }
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <span className="mr-1">Create Profile</span> <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg m-auto">
        <DialogHeader>
          <DialogTitle>Create profile</DialogTitle>
          <DialogDescription>
            Make your profile here. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {user?.status !== 'authenticated' ? (
          <form action={formAction} ref={formRef}>
            <Card className="w-full">
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="username">Username :</Label>
                    <Input id="username" name="username" type="text" placeholder="Jokowi🚀" />
                    <p className="text-red-500 text-xs">
                      {state?.error?.username ? `*${state?.error?.username}` : ''}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="profile">Chosse profile :</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {image ? (
                            <div className="w-14 h-14 overflow-hidden rounded-full mb-3">
                              <Image
                                src={image}
                                alt={image}
                                priority
                                width={50}
                                height={50}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                          )}
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 text-center mx-auto">
                            <span className="font-semibold">Click to chosse</span> your profile here
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mx-auto">
                            PNG, JPG or JPEG (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          name="image"
                          type="file"
                          className="hidden"
                          onChange={(e) => handleInputImage(e)}
                        />
                      </label>
                    </div>
                    <p className="text-red-500 text-xs">{state?.error?.image}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <DialogFooter className="mt-4">
              <ButtonSend />
            </DialogFooter>
          </form>
        ) : (
          <div className="py-8">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <p className="text-center mb-4 mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              Successfully Created Profile User{' '}
              <span className="font-bold block text-base">@{user?.data.user?.name} 🚀</span>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
