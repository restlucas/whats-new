import { ArrowLeft } from "@phosphor-icons/react";
import { Input } from "@src/components/input";
import { UserContext } from "@src/contexts/UserContext";
import { updateProfile } from "@src/services/userServices";
import { setLocalStorage } from "@src/utils/storageUtils";
import { FormEvent, useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface FormProps {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function MyProfile() {
  const { user, setUser } = useContext(UserContext);

  const [message, setMessage] = useState<{
    code: number;
    message: string;
  } | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formProfile, setFormProfile] = useState<FormProps>({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormProfile((prevState: FormProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formProfile.password !== formProfile.confirmPassword) {
      setMessage({ code: 400, message: "Passwords do not match" });
    } else {
      const response = await updateProfile({ userId: user.id, ...formProfile });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage(response);
      alert(response.message);

      setLocalStorage("@whats-new:user", response.data);
      setUser(response.data);
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet title="My profile" />
      <section className="w-screen h-screen flex items-center justify-center">
        <div className="mx-6 w-full md:w-1/2 xl:w-1/3 flex flex-col items-center justify-center gap-6">
          <Link
            to="/"
            className="w-full flex items-center justify-start gap-2 group"
          >
            <ArrowLeft size={22} className="duration-200 dark:fill-light" />
            <span className="font-bold duration-200 group-hover:underline drop-shadow-lg dark:text-light">
              Get back
            </span>
          </Link>
          <div className="w-full rounded-md border border-tertiary/20 dark:border-tertiary h-auto p-8 shadow-md">
            <h1 className="font-bold text-4xl text-red-vibrant mb-6">
              My profile
            </h1>

            <form
              id="formProfile"
              onSubmit={handleSubmit}
              className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Input
                label="Username"
                id="username"
                name="username"
                value={formProfile.username}
                placeholder="Your username here"
                handleChange={handleChange}
                disabled={true}
              />

              <div className="col-span-1 sm:col-span-2">
                <Input
                  label="Name"
                  id="name"
                  name="name"
                  value={formProfile.name}
                  placeholder="Your name here"
                  handleChange={handleChange}
                  required
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <Input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formProfile.email}
                  placeholder="Your email here"
                  handleChange={handleChange}
                  disabled
                />
              </div>

              <Input
                label="New password"
                id="password"
                name="password"
                type="password"
                value={formProfile.password}
                placeholder="*********"
                handleChange={handleChange}
                required
              />

              <Input
                label="Confirm new password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formProfile.confirmPassword}
                placeholder="*********"
                handleChange={handleChange}
                required
              />

              <div className="col-span-full mt-4 w-full flex items-center justify-end">
                <button
                  type="submit"
                  className="w-[150px] h-10 bg-red-vibrant rounded-md text-center text-white font-bold duration-200 hover:bg-red-hover flex items-center justify-center"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <span>Salvar</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
