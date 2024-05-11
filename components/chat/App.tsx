'use client';

import { useEffect, useRef, useState } from 'react';

import { ChatList } from '@/components/chat//ChatList';
import InputMessage from '@/components/chat/InputMessage';
import HeaderProfile from '@/components/chat/HeaderProfile';
import HeaderTitle from '@/components/chat/HeaderTitle';
import { CreateUserModal } from '@/components/chat/CreateUserModal';
import { useClientSession } from '@/lib/session';
import { Skeleton } from '@/components/shadcn/ui/skeleton';

import app from '@/lib/firebase';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { IMessage, IRawMessage } from '@/types/chat-message';
import { v4 as uuid } from 'uuid';
import ChatLoading from './ChatLoading';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function App() {
  const chatRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(true);
  const [isScroll, setIsScroll] = useState(false);
  const [reply, setReply] = useState({ isReply: false, name: '' });

  const user = useClientSession();
  const userData: any = user?.data?.user;

  const db = getDatabase(app);

  function sendMessage(text: string) {
    const id = uuid();
    const messageRef = ref(db, `messages/${id}`);

    set(messageRef, {
      id: id,
      user_id: userData?.id,
      name: userData?.name,
      image: userData?.image,
      text,
      created_at: new Date().toISOString(),
      is_replay: reply.isReply,
      reply_to: reply.name,
    });

    setReply({ isReply: false, name: '' });
  }

  function handleCenselReply() {
    setReply({ isReply: false, name: '' });
  }

  useEffect(() => {
    const messageRef = ref(db, 'messages');
    onValue(messageRef, (snapshot) => {
      const data: IRawMessage = snapshot.val();

      const transformMessage: IMessage[] = Object.entries(data)
        .map(([id, value]) => ({
          id,
          ...value,
        }))
        .sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        });

      setMessages(transformMessage);
      setChatLoading(false);
    });
  }, [db]);

  useEffect(() => {
    if (chatRef.current && !isScroll) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isScroll]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatRef.current) {
        const isScrollToBottom =
          chatRef.current.scrollHeight - chatRef.current.clientHeight <= chatRef.current.scrollTop + 5;

        if (isScrollToBottom) {
          setIsScroll(false);
        } else {
          setIsScroll(true);
        }
      }
    };

    chatRef.current?.addEventListener('scroll', handleScroll);
    const currentChatRef = chatRef.current;

    return () => {
      currentChatRef?.removeEventListener('scroll', handleScroll);
    };
  }, [messages]);

  useEffect(() => {
    if (user.status === 'authenticated') {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <section>
      <div className="max-w-3xl m-auto p-4">
        {userData && (
          <div className="mb-6">
            <HeaderProfile />
          </div>
        )}
        {loading && (
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
        <div className="mb-6">
          <HeaderTitle />
        </div>
        {chatLoading ? (
          <div
            className={`w-full ${
              userData ? 'h-[60vh] md:h-[65vh]' : 'h-[70vh] md:h-[75vh]'
            } flex justify-center items-center`}
          >
            <ChatLoading />
          </div>
        ) : (
          <ChatList messages={messages} ref={chatRef} setReply={setReply} />
        )}
        {userData && (
          <div className="space-y-3">
            {reply.isReply && (
              <div className="w-fit px-3 py-1 shadow-sm rounded-md bg-neutral-100 flex gap-2">
                <p className="text-xs">
                  Replying to <span className="text-teal-500">@{reply.name}</span>
                </p>
                <div className="w-4 h-4 p-1 bg-white rounded-full grid place-content-center shadow-sm">
                  <Cross2Icon className="cursor-pointer w-3 h-3" onClick={handleCenselReply} />
                </div>
              </div>
            )}
            <InputMessage setIsScroll={setIsScroll} send={sendMessage} />
          </div>
        )}
        {!userData && (
          <div className="w-full flex justify-center py-4">
            <CreateUserModal />
          </div>
        )}
      </div>
    </section>
  );
}
