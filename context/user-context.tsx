'use client';

import { InitialUserState, UserType } from '@/types/user-type';
import { ReactNode, createContext, useState } from 'react';

export const UserContext = createContext<InitialUserState | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [stateUser, setStateUser] = useState<UserType | null>(null);

    const value: InitialUserState = { user: stateUser, setUser: setStateUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
