// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage } from "@src/utils/storageUtils";

interface AuthContextData {
  isAuthenticated: boolean | null;
}

const AuthContext = createContext<AuthContextData>({ isAuthenticated: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const userInStorage = getLocalStorage("@whats-new:user");
    setIsAuthenticated(!!userInStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
