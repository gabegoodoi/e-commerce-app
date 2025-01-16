import { createContext } from "react";

// Define the UserType interface
export interface UserType {
    name: string;
    username?: string;
    token: string;
    isLoggedIn: boolean;
}

// Update UserContextType to use UserType
export interface UserContextType {
    user: UserType; // Use the UserType interface
    setUser: (user: UserType) => void; // Function to update the user data in context
}

// Default values for the context
const defaultContext: UserContextType = {
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
