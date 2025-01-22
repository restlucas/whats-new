import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="bg-light text-primary dark:text-light dark:bg-dark flex flex-col min-h-screen w-full overflow-x-hidden relative space-y-8">
      <Header />
      <main className="mx-8 flex-grow md:mx-12 xl:mx-36 md:my-10 space-y-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
