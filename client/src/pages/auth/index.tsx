import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { useLocation } from "react-router-dom";

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
