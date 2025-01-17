import { createContext } from "react";

export interface UserType {
    name: string;
    username?: string;
    token: string;
    isLoggedIn: boolean;
}

export interface UserContextType {
    user: UserType;
    setUser: (user: UserType) => void;
}

// Default values for the context
export const defaultContext: UserContextType = {
    user: {
        name: "",
        username: "",
        token: "",
        isLoggedIn: false,
    },
    setUser: () => {}, // No-op function as default
};

// Create the context with defaultContext and enforce non-null
const UserContext = createContext<UserContextType>(defaultContext);

export default UserContext;