import { useEffect, useState } from "react";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Forgot } from "./components/forgot";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export function AuthCreator() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const method = queryParams.get("method");
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const [auth, setAuth] = useState("login");

  const handleAuth = (type: string) => {
    setAuth(type);
  };

  useEffect(() => {
    if (method === "register" && token && email) {
      setAuth("register");
    }
  }, []);

  return (
    <section className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 p-3">
      <div className="hidden md:block relative w-full h-full bg-red-vibrant rounded-xl overflow-hidden">
        <div
          className="z-10 bg-repeat bg-center animate-slide-left w-full h-full"
          style={{
            backgroundImage: `url(/article-creator.svg)`,
            backgroundSize: "50px",
          }}
        />
        <div className="absolute z-20 top-0 left-0 bottom-0 right-0 bg-black/70 flex flex-col items-center justify-center gap-4 text-white">
          <h2 className="text-lg drop-shadow-lg">Welcome creator!</h2>
          <h1 className="font-bold text-5xl drop-shadow-lg">what's new</h1>
        </div>
      </div>
      <aside className="relative bg-light dark:bg-dark flex items-center justify-center">
        <div className="absolute top-5 left-5">
          <Link to="/" className="flex items-center justify-start gap-2 group">
            <ArrowLeft size={22} className="duration-200 dark:fill-light" />
            <span className="font-bold  duration-200 group-hover:underline drop-shadow-lg dark:text-light">
              Get back
            </span>
          </Link>
        </div>
        {auth === "login" && (
          <Login entranceMode="CREATOR" handleAuth={handleAuth} />
        )}
        {auth === "register" && (
          <Register
            registerMode="CREATOR"
            params={{ token: token, email: email }}
            handleAuth={handleAuth}
          />
        )}
        {auth === "forgot" && <Forgot handleAuth={handleAuth} />}
      </aside>
      {/* <div className="absolute top-5 left-5">
        <Link to="/" className="flex items-center justify-start gap-2 group">
          <ArrowLeft
            size={22}
            className="duration-200 group-hover:fill-red-vibrant"
          />
          <span className="font-bold  duration-200 group-hover:text-red-vibrant">
            Get back
          </span>
        </Link>
      </div>
      {auth === "login" ? (
        <Helmet title="Login" />
      ) : (
        <Helmet title="Register" />
      )}
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="mx-4 w-[500px] rounded-2xl shadow-2xl p-6 text-primary dark:text-light bg-[#ededed] dark:bg-tertiary overflow-hidden border border-tertiary/20 dark:border-tertiary">
          {auth === "login" ? (
            <Login handleAuth={handleAuth} />
          ) : (
            <Register
              params={{ token: token, email: email }}
              handleAuth={handleAuth}
            />
          )}
        </div>
      </div> */}
    </section>
  );
}
