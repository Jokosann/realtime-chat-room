import { getUserById } from '@/lib/data';
import { User } from '@prisma/client';

export const local = async (user: User) => {
    const userCreate = await getUserById(user.id);
    const id = localStorage.setItem('id', `${userCreate?.id}`);
    return id;
};
