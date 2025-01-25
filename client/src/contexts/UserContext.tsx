import { createContext, useState, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from "../utils/storageUtils";
import { check, login, logout, register } from "../services/authServices";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  token: string;
}

interface UserContextType {
  user: any | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  checkUser: () => any;
  signIn: (
    credentials: { username: string; password: string },
    entranceMode: string
  ) => any;
  signUp: (user: UserData) => any;
  signOut: () => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const location = useLocation();
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();

  const checkUser = async () => {
    const response = await check();
    return response;
  };

  const signIn = async (
    credentials: {
      username: string;
      password: string;
    },
    entranceMode: string
  ) => {
    const response = await login(credentials, entranceMode);

    if (response.status === 401) {
      return response;
    }

    setLocalStorage("@whats-new:user", response.user);
    setUser(response.user);
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
    await logout();

    removeLocalStorage("@whats-new:user");
    removeLocalStorage("@whats-new:teams");
    removeLocalStorage("@whats-new:active-team");

    alert("Logged out successfully.");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (location.pathname === "/") {
      setUser(undefined);
    } else {
      navigate("/");
    }
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
        setUser,
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
