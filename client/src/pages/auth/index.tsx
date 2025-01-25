import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export function Auth() {
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
    <>
      <div className="absolute top-5 left-5">
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
      <section className="h-screen w-screen flex items-center justify-center">
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
      </section>
    </>
  );
}
