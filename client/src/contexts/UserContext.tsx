import { createContext, useState, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from "../utils/storageUtils";
import { check, login, logout, register } from "../services/authServices";
import { fetchLikes, toggleLike } from "@src/services/userServices";

export interface User {
  id: string;
  image: string;
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
  registerMode: "READER" | "CREATOR";
}

interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  likedNews: string[];
  setLikedNews: React.Dispatch<React.SetStateAction<string[]>>;
  checkUser: () => void;
  getLikes: (userId: string) => void;
  toggleArticleLike: (method: string, userId: string, newsId: string) => void;
  signIn: (
    credentials: { username: string; password: string },
    entranceMode: string
  ) => Promise<{ status: number; user?: User; message?: string }>;
  signUp: (user: UserData) => void;
  signOut: (message: string) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const location = useLocation();
  const [user, setUser] = useState<User | undefined>();
  const [likedNews, setLikedNews] = useState<string[]>([]);
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
  ): Promise<{ status: number; user?: User; message?: string }> => {
    const response = await login(credentials, entranceMode);

    if (response.status === 401) {
      return { status: 401, message: response.message };
    }

    setLocalStorage("@whats-new:user", response.user);
    setUser(response.user);

    return {
      status: response.status as number,
      user: response.user,
    };
  };

  const signUp = async (user: UserData) => {
    const response = await register(user);

    if (response.status === 401) {
      return response;
    }

    return response;
  };

  const signOut = async (message: string) => {
    await logout();

    removeLocalStorage("@whats-new:user");
    removeLocalStorage("@whats-new:teams");
    removeLocalStorage("@whats-new:active-team");
    removeLocalStorage("@whats-new:liked-news");

    alert(message);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser(undefined);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const getLikes = async (userId: string) => {
    const response = await fetchLikes(userId);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLikedNews(response.likes);
    setLocalStorage("@whats-new:liked-news", response.likes);
  };

  const toggleArticleLike = async (
    method: string,
    userId: string,
    newsId: string
  ) => {
    const updatedLikes = [...likedNews];

    const updateState = (newLikes: string[]) => {
      setLocalStorage("@whats-new:liked-news", newLikes);
      setLikedNews(newLikes);
    };

    const newLikes =
      method === "add"
        ? [...updatedLikes, newsId]
        : updatedLikes.filter((id) => id !== newsId);

    if (newLikes !== updatedLikes) {
      updateState(newLikes);
    }

    await toggleLike(method, userId, newsId);
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
        likedNews,
        setLikedNews,
        checkUser,
        toggleArticleLike,
        signIn,
        signUp,
        signOut,
        getLikes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
