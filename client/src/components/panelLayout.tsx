import { Outlet, Navigate } from "react-router-dom";
import { PanelNavigation } from "./panelNavigation";
import useAuthCheck from "../hooks/useAuth";

export function PanelLayout() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  if (!isAuthenticated) return <Navigate to="/auth" />;

  return (
    <div className="bg-light text-primary dark:text-light dark:bg-dark flex flex-col md:flex-row h-auto md:h-screen w-full md:divide-x-2 dark:divide-tertiary overflow-x-hidden">
      <PanelNavigation />
      <main className="flex-grow py-8 px-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
