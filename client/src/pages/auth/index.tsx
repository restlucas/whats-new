import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Login } from "./components/login";
import { Register } from "./components/register";

export function Auth() {
  const [auth, setAuth] = useState("login");

  const handleAuth = (type: string) => {
    setAuth(type);
  };
  return (
    <>
      {auth === "login" ? (
        <Helmet title="Login" />
      ) : (
        <Helmet title="Register" />
      )}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="w-[500px] rounded-2xl shadow-2xl p-6 text-primary dark:text-light bg-[#ededed] dark:bg-tertiary overflow-hidden">
          {auth === "login" ? (
            <Login handleAuth={handleAuth} />
          ) : (
            <Register handleAuth={handleAuth} />
          )}
        </div>
      </section>
    </>
  );
}
