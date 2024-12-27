import { Outlet, Navigate } from "react-router-dom";
import { Aside } from "./aside";
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
    <div className="bg-light text-primary dark:text-light dark:bg-dark flex h-screen w-full divide-x-2 dark:divide-tertiary">
      <Aside />
      <main className="flex-grow py-8 px-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
