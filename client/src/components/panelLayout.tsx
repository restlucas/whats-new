import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PanelNavigation } from "./panelNavigation";

export function PanelLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/auth/creator" />;

  return (
    <div className="bg-light text-primary dark:text-light dark:bg-dark flex flex-col md:flex-row h-auto md:h-screen w-full md:divide-x-2 dark:divide-tertiary overflow-x-hidden">
      <PanelNavigation />
      <main className="flex-grow py-8 px-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
