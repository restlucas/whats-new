import { AuthButton } from "@src/components/button/auth";
import { requestResetPassword } from "@src/services/authServices";
import { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";

export function Forgot() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<
    { status: number; content: string } | undefined
  >();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await requestResetPassword(email);

    setMessage({
      status: response.status,
      content: response.data.message,
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
  };

  return (
    <>
      <Helmet title="Reset password" />
      <div className="animate-fade-xaxis flex flex-col gap-4 mx-4 w-full md:w-1/2 dark:text-light">
        <h1 className="font-bold text-4xl text-red-vibrant">Reset password</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold dark:text-white">
              Your email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              type="email"
              className={`rounded-md px-2 py-1 h-9 border border-tertiary/20 dark:border-slate-600 shadow-sm dark:text-white dark:bg-[#3c4856]`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <AuthButton loading={loading} text="Send recovery link" />

          {message && (
            <div
              className={`mt-4 font-bold text-center text-sm ${message.status !== 200 ? "text-red-vibrant" : "text-green-500"}`}
            >
              {message.content}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
