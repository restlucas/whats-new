import { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  removeLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from "../utils/storageUtils";
import { check, login, logout, register } from "../services/authServices";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface UserContextType {
  user: any | undefined;
  checkUser: () => any;
  signIn: (credentials: { username: string; password: string }) => any;
  signUp: (user: UserData) => any;
  signOut: () => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();

  const checkUser = async () => {
    const response = await check();
    return response;
  };

  const signIn = async (credentials: {
    username: string;
    password: string;
  }) => {
    const response = await login(credentials);

    if (response.status === 401) {
      return response;
    }

    setLocalStorage("@whats-new:user", response.user);
    return response;
  };

  const signUp = async (user: UserData) => {
    const response = await register(user);

    if (response.status === 401) {
      return response;
    }

    return response;
  };

  const signOut = async () => {
    const response = await logout();

    removeLocalStorage("@whats-new:user");
    removeLocalStorage("@whats-new:teams");
    removeLocalStorage("@whats-new:active-team");

    alert("Logged out successfully. Redirecting to home page.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/");
  };

  useEffect(() => {
    const userInStorage = getLocalStorage("@whats-new:user") as User;

    if (userInStorage) {
      setUser(userInStorage);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        checkUser,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
