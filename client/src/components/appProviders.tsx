import { AuthProvider } from "@src/contexts/AuthContext";
import { TeamContextProvider } from "@src/contexts/TeamContext";
import { UserContextProvider } from "@src/contexts/UserContext";
import { ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <UserContextProvider>
        <TeamContextProvider>
          <HelmetProvider>
            <Helmet titleTemplate="%s | What's new?" />
            {children}
          </HelmetProvider>
        </TeamContextProvider>
      </UserContextProvider>
    </AuthProvider>
  );
}
