import { ChatList } from '@/components/chat//ChatList';
// import InputMessage from '@/components/chat/InputMessage';
// import HeaderProfile from '@/components/chat/HeaderProfile';
import HeaderTitle from '@/components/chat/HeaderTitle';
import { CreateUserModal } from '@/components/chat/CreateUserModal';
import { getUserById } from '@/lib/data';

export default async function Home() {
    const data = await getUserById('clvop1vc50000ge31tpf3h5rl');
    console.log(data);

    return (
        <section>
            <div className="max-w-4xl m-auto p-4">
                {/* <div className="mb-6">
                    <HeaderProfile />
                </div> */}
                <div className="mb-6">
                    <HeaderTitle />
                </div>
                <ChatList />
                {/* <div className="py-4">
                    <InputMessage />
                </div> */}
                <div className="w-full flex justify-center py-4">
                    <CreateUserModal />
                </div>
            </div>
        </section>
    );
}
