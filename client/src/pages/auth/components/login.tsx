import { FormEvent, useContext, useState } from "react";
import { Input } from "@src/components/input";
import { UserContext } from "@src/contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface FormProps {
  username: string;
  password: string;
}

export function Login({ handleAuth }: any) {
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
    <div className="animate-fade-xaxis flex flex-col h-[600px]">
      <h1 className="font-bold text-4xl text-red-vibrant dark:text-light">
        Login
      </h1>

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
        <button
          type="submit"
          className="w-full h-11 rounded-md bg-red-vibrant text-white font-bold duration-200 hover:bg-red-hover flex items-center justify-center"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 text-center text-sm ${message.code === 401 ? "text-red-vibrant" : "text-green-500"}`}
        >
          {message.title}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-sm mt-auto mb-10">
        <span>Don't have an account?</span>
        <button
          className="font-bold font-bold duration-200 hover:underline"
          onClick={() => handleAuth("register")}
        >
          Register!
        </button>
      </div>
    </div>
  );
}
