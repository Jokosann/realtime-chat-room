import { Dispatch, SetStateAction } from 'react';

export type UserType = {
    id: string | null;
    user_id: string | null;
    username: string | null;
    image: string | null;
};

export type InitialUserState = {
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
};
