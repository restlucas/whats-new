import { FormEvent, useContext, useEffect, useState } from "react";
import { Input } from "@src/components/input";
import { UserContext } from "@src/contexts/UserContext";
import { Helmet } from "react-helmet-async";
import { AuthButton } from "@src/components/button/auth";

interface RegisterProps {
  registerMode: "READER" | "CREATOR";
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

export function Register({ registerMode, params, handleAuth }: RegisterProps) {
  const url = new URL(window.location.href);
  const [message, setMessage] = useState<{
    code: number;
    title: string;
  } | null>(null);
  const [form, setForm] = useState<FormProps>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [token] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp } = useContext(UserContext);

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
    setLoading(true);

    const data = {
      ...form,
      token: token,
      registerMode,
    };

    if (form.password !== form.confirmPassword) {
      setMessage({ code: 400, title: "Passwords do not match" });
    } else {
      const response = await signUp(data);

      if (response.status !== 201) {
        setMessage({
          code: response.status,
          title: response.message as string,
        });
      } else {
        setMessage({
          code: 201,
          title: `User successfully created. Please, make login!`,
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        url.search = "";
        window.history.replaceState({}, "", url.toString());
        handleAuth("login");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params) {
      setForm((prevState) => ({
        ...prevState,
        email: params.email || "",
      }));
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
            label="Confirm password"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            placeholder="******"
            handleChange={handleChange}
            required
          />

          <AuthButton loading={loading} text="Register" />
        </form>

        {message && (
          <div
            className={`mt-4 font-bold text-center text-sm ${message.code !== 201 ? "text-red-vibrant" : "text-green-500"}`}
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
