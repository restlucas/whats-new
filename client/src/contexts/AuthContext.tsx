import { getLocalStorage } from "@src/utils/storageUtils";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
  isAuthenticated: boolean | null;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
