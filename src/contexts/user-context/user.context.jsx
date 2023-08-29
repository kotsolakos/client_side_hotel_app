import { createContext, useState } from 'react';

export const UserContext = createContext({
    user: {
        id: '',
        name: '',
        email: '',
        reserved_rooms: ''
    }
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
            id: '',
            name: '',
            email: '',
            reserved_rooms: ''
        });
    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
};