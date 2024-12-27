import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getLocalStorage } from "../utils/storageUtils";

const useAuthCheck = () => {
  const { checkUser } = useContext(UserContext);
  const user = getLocalStorage("@whats-new:user");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const { status, data } = await checkUser();
        setIsAuthenticated(
          status === 201 && data.message === "Authenticated" && !!user
        );
      } catch {
        setIsAuthenticated(false);
      }
    };

    verifyAuthentication();
  }, [checkUser, user]);

  return isAuthenticated;
};

export default useAuthCheck;
