// hooks/useInitializeAuth.ts
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext, User } from "@src/contexts/UserContext";
import { TeamContext } from "@src/contexts/TeamContext";
import { getLocalStorage } from "@src/utils/storageUtils";
import useAuthCheck from "./useAuthCheck";

export const useInitializeAuth = () => {
  const isAuthenticated = useAuthCheck();
  const { setUser, setLikedNews, getLikes } = useContext(UserContext);
  const { getTeams } = useContext(TeamContext);

  useEffect(() => {
    if (isAuthenticated) {
      const userInStorage = getLocalStorage("@whats-new:user") as User;

      if (userInStorage) {
        setUser(userInStorage);
        setLikedNews(userInStorage);
        getTeams(userInStorage.id);
        getLikes(userInStorage.id);
      }
    }
  }, [isAuthenticated, setUser, setLikedNews, getTeams, getLikes]);

  return { isAuthenticated };
};
