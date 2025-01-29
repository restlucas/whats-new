import { Input } from "@src/components/input";
import { SelectInput } from "@src/components/input/select";
import { Editor } from "./editor";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@src/utils/storageUtils";
import { TeamContext } from "@src/contexts/TeamContext";
import { UserContext } from "@src/contexts/UserContext";
import { handleNews } from "@src/services/newsServices";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export interface NewsProps {
  title: string;
  category: string;
  description: string;
  content: string;
}

interface FormProps {
  // form: NewsProps;
  action: "post" | "put";
  slug?: string;
  filledForm?: NewsProps;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleContent: (newValue: string) => void;
  // resetForm: () => void;
}

const formSchema = z.object({
  title: z.string().min(10, "Title must contain at least 10 characters"),
  category: z.string().min(1, "Category must be selected"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(200, "Content must be at least 100 characters"),
});

const categories = [
  { value: "general", name: "General" },
  { value: "business", name: "Business" },
  { value: "entertainment", name: "Entertainment" },
  { value: "health", name: "Health" },
  { value: "science", name: "Science" },
  { value: "sports", name: "Sports" },
  { value: "technology", name: "Technology" },
  { value: "world", name: "World" },
  { value: "games", name: "Games" },
];

export function NewsForm({ action, slug, filledForm }: FormProps) {
  const navigate = useNavigate();
  const { activeTeam } = useContext(TeamContext);
  const { user } = useContext(UserContext);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<NewsProps>({
    title: "",
    description: "",
    category: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = formSchema.safeParse(form);

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
      return;
    }

    setErrors({});

    if (activeTeam && user) {
      const response = await handleNews(
        {
          fields: form,
          slug,
          teamId: activeTeam?.id,
          userId: user.id,
        },
        action
      );

      if (response.status === 201) {
        if (action === "post") {
          await removeLocalStorage("@whats-new:draft-news-form");
          alert("News created successfully!");
        } else {
          alert("News updated successfully!");
        }
        navigate(0);
      }
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleContent = (newValue: string) => {
    setForm((prevState) => ({ ...prevState, content: newValue }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      content: "",
    });
  };

  useEffect(() => {
    if (action === "post") {
      const formInStorage = getLocalStorage(
        "@whats-new:draft-news-form"
      ) as NewsProps;
      if (formInStorage) setForm(formInStorage);
    }
  }, []);

  useEffect(() => {
    if (action === "post") setLocalStorage("@whats-new:draft-news-form", form);
  }, [form]);

  useEffect(() => {
    if (filledForm) setForm(filledForm);
  }, [filledForm]);

  return (
    <form id="newsForm" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            id="title"
            name="title"
            label="Title"
            value={form.title || ""}
            placeholder="News title..."
            handleChange={handleChange}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>
        <div>
          <SelectInput
            label="Category"
            name="category"
            value={form.category || ""}
            options={categories}
            handleChange={handleChange}
          />
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category}</span>
          )}
        </div>
        <div className="md:row-start-2 md:col-span-2">
          <Input
            id="description"
            name="description"
            label="Description"
            value={form.description || ""}
            placeholder="News description..."
            handleChange={handleChange}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
        <div className="md:row-start-3 col-span-full flex flex-col gap-1">
          <span className="font-semibold">Content</span>
          <div className="border rounded-md border-tertiary/20 dark:border-slate-600 bg-white dark:bg-[#3c4856]">
            <Editor content={form.content} onChange={handleContent} />
          </div>
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content}</span>
          )}
        </div>
        <div className="col-span-full flex items-center justify-end gap-4">
          {action === "put" && (
            <Link
              to="/panel/news"
              className="py-1 px-3 rounded-md font-semibold duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} weight="bold" />
              <span>Get back</span>
            </Link>
          )}
          <button
            type="button"
            onClick={resetForm}
            className="py-1 px-3 rounded-md font-semibold duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
          >
            Reset fields
          </button>
          <button
            type="submit"
            className="py-1 px-3 rounded-md bg-red-vibrant font-semibold text-white duration-100 hover:bg-red-hover"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
