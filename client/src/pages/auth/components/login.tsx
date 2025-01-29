import { FormEvent, useContext, useState } from "react";
import { Input } from "@src/components/input";
import { UserContext } from "@src/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthButton } from "@src/components/button/auth";

interface LoginProps {
  entranceMode: string;
  handleAuth: (type: string) => void;
}

interface FormProps {
  username: string;
  password: string;
}

export function Login({ entranceMode, handleAuth }: LoginProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    code: number;
    title: string;
  } | null>();
  const [form, setForm] = useState<FormProps>({
    username: "",
    password: "",
  });
  const { signIn } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevState: FormProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form) {
      setLoading(true);
      setMessage(null);
      const response = await signIn(form, entranceMode);

      if (response.status === 401) {
        setMessage({
          code: response.status,
          title: response.message as string,
        });
      } else {
        setMessage({ code: 201, title: "Login successful!" });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if (entranceMode === "READER") {
          navigate("/");
        } else {
          navigate("/panel");
        }
      }

      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="animate-fade-xaxis flex flex-col gap-4 mx-4 w-full md:w-1/2 dark:text-light">
        <h1 className="font-bold text-4xl text-red-vibrant">Login</h1>

        <h3 className="text-sm text-center mt-10">Enter your credentials</h3>

        <form
          id="loginForm"
          onSubmit={handleSubmit}
          className="w-full h-auto flex flex-col gap-4 mt-4"
        >
          <Input
            label="Username"
            id="username"
            name="username"
            value={form.username}
            placeholder="Username"
            handleChange={handleChange}
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            value={form.password}
            placeholder="******"
            handleChange={handleChange}
            required
          />
          <AuthButton loading={loading} text="Login" />
        </form>

        {message && (
          <div
            className={`mt-4 font-bold text-center text-sm ${message.code === 401 ? "text-red-vibrant" : "text-green-500"}`}
          >
            {message.title}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm">
          <span>Forgout you password?</span>
          <button
            className="font-bold duration-200 hover:underline"
            onClick={() => handleAuth("forgot")}
          >
            Click here!
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm mt-auto mb-10">
          <span>{"Don't have an account?"}</span>
          <button
            className="font-bold duration-200 hover:underline"
            onClick={() => handleAuth("register")}
          >
            Register!
          </button>
        </div>
      </div>
    </>
  );
}
