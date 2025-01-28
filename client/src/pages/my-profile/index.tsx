import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { Input } from "@src/components/input";
import { UserContext } from "@src/contexts/UserContext";
import { updateProfile } from "@src/services/userServices";
import { setLocalStorage } from "@src/utils/storageUtils";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { transformToFile } from "@src/utils/transformToFile";
import { Picture } from "./components/picture";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(5, "O nome é deve conter pelo menos 5 caracteres"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword !== data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

export interface ProfileFormProps {
  username: string;
  name: string;
  image: File | null;
  email: string;
  password: string;
  confirmPassword: string;
}

export function MyProfile() {
  const navigate = useNavigate();
  const { user, setUser, signOut } = useContext(UserContext);

  const [message, setMessage] = useState<{
    code: number;
    message: string;
  } | null>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [formProfile, setFormProfile] = useState<ProfileFormProps>({
    username: "",
    image: null,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormProfile((prevState: ProfileFormProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = formSchema.safeParse(formProfile);

    if (!validation.success) {
      setErrors(
        validation.error.errors.reduce(
          (acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
          },
          {} as Record<string, string>
        )
      );
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("name", formProfile.name);
    formData.append("password", formProfile.password);

    if (formProfile.image) {
      formData.append("image", formProfile.image);
    }

    const response = await updateProfile(formData);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessage(response);
    alert(response.message);

    if (formProfile.password !== "") {
      signOut("Please, make login again.");
      return;
    }

    setLocalStorage("@whats-new:user", response.data);
    setUser(response.data);
    setLoading(false);
  };

  useEffect(() => {
    const saveUser = async () => {
      let pictureConverted = null;

      if (user.image)
        pictureConverted = (await transformToFile(user.image)) as File;

      const form = {
        username: user.username,
        image: pictureConverted,
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
      };

      setFormProfile(form);
    };

    if (user) {
      saveUser();
    }
  }, [user]);

  return (
    <>
      <Helmet title="My profile" />
      <section className="w-screen h-screen flex items-center justify-center">
        <div className="mx-6 w-full md:w-1/2 xl:w-1/3 flex flex-col items-center justify-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-start gap-2 group"
          >
            <ArrowLeft size={22} className="duration-200 dark:fill-light" />
            <span className="font-bold duration-200 group-hover:underline drop-shadow-lg dark:text-light">
              Get back
            </span>
          </button>
          <div className="w-full rounded-md border border-tertiary/20 dark:border-tertiary h-auto p-8 shadow-md">
            <h1 className="font-bold text-4xl text-red-vibrant mb-6">
              My profile
            </h1>

            <form
              id="formProfile"
              onSubmit={handleSubmit}
              className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center gap-4">
                <Picture
                  picture={formProfile.image}
                  setFormProfile={setFormProfile}
                />
                {/* <input id="photo" name="photo" type="file" hidden />

                <div
                  className={`h-32 w-32 rounded-full bg-tertiary/20 dark:bg-tertiary`}
                />
                <label
                  htmlFor="photo"
                  className="dark:text-light rounded-md px-4 py-1 border text-sm cursor-pointer font-semibold"
                >
                  Select photo
                </label> */}
              </div>

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
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
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

              <div>
                <Input
                  label="New password"
                  id="password"
                  name="password"
                  type="password"
                  value={formProfile.password}
                  placeholder="*********"
                  handleChange={handleChange}
                  required={!!formProfile.password}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>

              <div>
                <Input
                  label="Confirm new password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formProfile.confirmPassword}
                  placeholder="*********"
                  handleChange={handleChange}
                  required={!!formProfile.password}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

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
