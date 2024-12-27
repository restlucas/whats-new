import { FormEvent, useContext, useState } from "react";
import { Input } from "../../../components/input";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface FormProps {
  username: string;
  password: string;
}

export function Login({ handleAuth }: any) {
  const navigate = useNavigate();
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
      setMessage(null);
      const response = await signIn(form);

      if (response.status === 401) {
        setMessage({ code: response.status, title: response.message });
      }

      setMessage({ code: 201, title: "Login successful!" });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/panel");
    }
  };
  return (
    <div className="flex flex-col h-[600px]">
      <h1 className="font-bold text-4xl text-gray-700 dark:text-light">
        Login
      </h1>

      <h3 className="text-sm text-center mt-10 opacity-50">
        Enter your credentials
      </h3>

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
        <button
          type="submit"
          className="w-full h-11 rounded-md bg-vibrant-red font-bold duration-150 hover:bg-red-400"
        >
          Login
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 text-center text-sm ${message.code === 401 ? "text-vibrant-red" : "text-green-500"}`}
        >
          {message.title}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-sm mt-auto mb-10">
        <span>Don't have an account?</span>
        <button className="font-bold" onClick={() => handleAuth("register")}>
          Register!
        </button>
      </div>
    </div>
  );
}
