import { FormEvent, useContext, useEffect, useState } from "react";
import { Input } from "@src/components/input";
import { UserContext } from "@src/contexts/UserContext";
import { validateInvitation } from "@src/services/authServices";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface RegisterProps {
  entranceMode: string;
  params?: {
    token: string | null;
    email: string | null;
  };
  handleAuth: (type: string) => void;
}

interface FormProps {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register({ entranceMode, params, handleAuth }: RegisterProps) {
  const url = new URL(window.location.href);
  const navigate = useNavigate();
  const [message, setMessage] = useState<{
    code: number;
    title: string;
  } | null>();
  const [form, setForm] = useState<FormProps>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState<string>("");
  const { signUp } = useContext(UserContext);

  const checkInvite = async (token: string) => {
    const response = await validateInvitation(token);

    if (response.data.message !== "Token is valid") {
      url.search = "";
      window.history.replaceState({}, "", url.toString());
      navigate("/error?message=Invalid%20invitation");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevState: FormProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const data = {
      ...form,
      token: token,
    };

    if (form.password !== form.confirmPassword) {
      setMessage({ code: 400, title: "Passwords do not match" });
    } else {
      const response = await signUp(data);

      if (response.status === 401) {
        setMessage(response);
      }

      setMessage({
        code: 201,
        title: `${response.message}. Please, make login!`,
      });

      await new Promise((resolve) => setTimeout(resolve, 4000));

      url.search = "";
      window.history.replaceState({}, "", url.toString());
      handleAuth("login");
    }
  };

  useEffect(() => {
    if (params && params.token && params.email) {
      checkInvite(params.token);

      setForm((prevState) => ({
        ...prevState,
        email: params.email || "",
      }));
      setToken(params.token);
    }
  }, []);

  return (
    <>
      <Helmet title="Register" />
      <div className="animate-fade-xaxis h-auto flex flex-col gap-4 mx-4 w-full md:w-1/2 dark:text-light">
        <h1 className="font-bold text-4xl text-red-vibrant">Register</h1>

        <h3 className="text-sm text-center mt-10">
          Fill in all the fields of the form
        </h3>

        <form
          id="registerForm"
          onSubmit={handleSubmit}
          className="w-full h-auto flex flex-col gap-4 mt-4"
        >
          <Input
            label="Full name"
            id="name"
            name="name"
            value={form.name}
            placeholder="Your name here"
            handleChange={handleChange}
            required
          />

          <Input
            label="Username"
            id="username"
            name="username"
            value={form.username}
            placeholder="Your username here"
            handleChange={handleChange}
            required
          />

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={form.email}
            placeholder="youremail@example.com"
            handleChange={handleChange}
            required
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            value={form.password}
            placeholder="********"
            handleChange={handleChange}
            required
          />

          <Input
            label="Confirme password"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            placeholder="******"
            handleChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full h-11 rounded-md bg-red-vibrant text-white font-bold duration-200 hover:bg-red-hover shadow-lg"
          >
            Register
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-center text-sm ${message.code === 401 ? "text-red-vibrant" : "text-green-500"}`}
          >
            {message.title}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm mt-10 mb-10">
          <span>Already have an account?</span>
          <button
            className="font-bold duration-200 hover:underline"
            onClick={() => handleAuth("login")}
          >
            Login!
          </button>
        </div>
      </div>
    </>
  );
}
