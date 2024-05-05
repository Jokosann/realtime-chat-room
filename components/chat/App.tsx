'use client';

import { ChatList } from '@/components/chat//ChatList';
import InputMessage from '@/components/chat/InputMessage';
import HeaderProfile from '@/components/chat/HeaderProfile';
import HeaderTitle from '@/components/chat/HeaderTitle';
import { CreateUserModal } from '@/components/chat/CreateUserModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClientSession } from '@/lib/session';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import { v4 as uuid } from 'uuid';
import { getDatabase, onValue, ref, serverTimestamp, set } from 'firebase/database';
import { IMessage, IRawMessage } from '@/types/chat-message';
import app from '@/lib/firebase';

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState({ isReply: false, name: '' });

  const user = useClientSession();
  const router = useRouter();

  const userData = user?.data?.user;

  const db = getDatabase(app);

  function sendMessage(text: string) {
    const id = uuid();
    const messageRef = ref(db, `message/${id}`);

    set(messageRef, {
      id: id,
      name: userData?.name,
      image: userData?.image,
      text,
      created_at: serverTimestamp(),
      is_replay: reply.isReply,
      reply_to: reply.name,
    });
  }

  useEffect(() => {
    const messageRef = ref(db, 'message');
    onValue(messageRef, (snapshot) => {
      const data: IRawMessage = snapshot.val();

      const transformMessage: IMessage[] = Object.entries(data)
        .map(([id, value]) => ({
          id,
          ...value,
        }))
        .sort((a, b) => a.created_at - b.created_at);
      setMessages(transformMessage);
    });
  }, [db]);

  useEffect(() => {
    if (user.status === 'authenticated') {
      router.refresh();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [router, user]);

  // console.log(messages);

  return (
    <section>
      <div className="max-w-4xl m-auto p-4">
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
        <ChatList messages={messages} />
        {userData && (
          <div className="py-4">
            <InputMessage send={sendMessage} />
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
