import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Forgot } from "./components/forgot";

export function AuthReader() {
  const [auth, setAuth] = useState("login");

  const handleAuth = (type: string) => {
    setAuth(type);
  };

  return (
    <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 p-3">
      <aside className="bg-light dark:bg-dark flex items-center justify-center relative">
        <div className="absolute top-5 left-5">
          <Link to="/" className="flex items-center justify-start gap-2 group">
            <ArrowLeft size={22} className="duration-200 dark:fill-light " />
            <span className="font-bold  duration-200 group-hover:underline drop-shadow-lg dark:text-light">
              Get back
            </span>
          </Link>
        </div>
        {auth === "login" && (
          <Login entranceMode="READER" handleAuth={handleAuth} />
        )}
        {auth === "register" && (
          <Register registerMode="READER" handleAuth={handleAuth} />
        )}
        {auth === "forgot" && <Forgot />}
      </aside>
      <div className="hidden md:block relative w-full h-full bg-red-vibrant rounded-xl overflow-hidden shadow-2xl">
        <div
          className="z-10 bg-repeat bg-center animate-slide-left w-full h-full"
          style={{
            backgroundImage: `url(/article-reader.svg)`,
            backgroundSize: "50px",
          }}
        />
        <div className="absolute z-20 top-0 left-0 bottom-0 right-0 bg-black/70 flex flex-col items-center justify-center gap-4 text-white">
          <h2 className="text-lg drop-shadow-lg">Welcome reader!</h2>
          <h1 className="font-bold text-5xl drop-shadow-lg">{"what's new"}</h1>
        </div>
      </div>
    </section>
  );
}
