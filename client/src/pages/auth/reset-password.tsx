import { SubmitButton } from "@src/components/button/submit";
import { Input } from "@src/components/input";
import { validateToken } from "@src/services/authServices";
import { resetPassword } from "@src/services/userServices";
import { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface FormProps {
  password: string;
  confirmPassword: string;
}

interface MessageProps {
  code: number;
  text: string;
}

export function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<MessageProps | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  const [form, setForm] = useState<FormProps>({
    password: "",
    confirmPassword: "",
  });

  const checkTokenValidation = async (token: string) => {
    const response = await validateToken(token);
    setIsTokenValid(response.isValid);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setForm((prevState: FormProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (form.password !== form.confirmPassword) {
      setMessage({ code: 400, text: "Passwords do not match" });
    } else {
      const response = await resetPassword(token as string, form.password);
      setMessage({ code: response.status, text: response.data.message });
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      checkTokenValidation(token);
    }
  }, [token]);

  return (
    <>
      <Helmet title="Password reset" />
      <section className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col gap-4 mx-6 w-full md:w-1/2 xl:w-1/3 rounded-md border border-tertiary/20 dark:border-tertiary h-auto p-8 shadow-md">
          <h1 className="font-bold text-4xl text-red-vibrant mb-6">
            Reset password
          </h1>

          {loading ? (
            <div className="w-full flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : isTokenValid ? (
            <div>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                <div className="w-full">
                  <Input
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    handleChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <Input
                    id="confirmPassword"
                    label="Confirm new password"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    handleChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full flex items-center justify-end">
                  <SubmitButton
                    loading={isSubmitting}
                    text="Save new password"
                  />
                </div>
              </form>
              {message && (
                <div
                  className={`mt-4 font-semibold text-center text-sm flex flex-col items-center justify-center gap-4 ${message.code !== 200 ? "text-red-vibrant" : "text-green-500"}`}
                >
                  <p>{message.text}</p>
                  {message.code === 200 && (
                    <Link to="/" className="underline">
                      Back to system
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <p className="w-full text-center font-bold dark:text-light">
                Invalid token
              </p>
              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 group"
              >
                <span className="font-bold duration-200 group-hover:underline drop-shadow-lg dark:text-light">
                  Get back
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
