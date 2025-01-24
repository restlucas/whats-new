import { categories } from "@src/components/header";
import { Input } from "@src/components/input";
import { SelectInput } from "@src/components/input/select";
import { useContext, useEffect, useState } from "react";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@src/utils/storageUtils";
import { Editor } from "./editor";
import { TeamContext } from "@src/contexts/TeamContext";
import { UserContext } from "@src/contexts/UserContext";
import { createNews } from "@src/services/newsServices";
import { useNavigate } from "react-router-dom";

interface NewsProps {
  title: string;
  description: string;
  category: string;
  content: string;
}

export function Create() {
  const navigate = useNavigate();
  const { activeTeam } = useContext(TeamContext);
  const { user } = useContext(UserContext);
  const [form, setForm] = useState<NewsProps>({
    title: "",
    description: "",
    category: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevState: NewsProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContent = (newValue: string) => {
    setForm((prevState: NewsProps) => ({
      ...prevState,
      content: newValue,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (activeTeam && user) {
      const response = await createNews({
        fields: form,
        teamId: activeTeam?.id,
        userId: user.id,
      });

      if (response.status === 201) {
        await removeLocalStorage("@whats-new:draft-news-form");
        alert("News created successfully!");
        navigate(0);
      }
    }
  };

  useEffect(() => {
    const formInStorage = getLocalStorage(
      "@whats-new:draft-news-form"
    ) as NewsProps;

    if (formInStorage) {
      setForm(formInStorage);
    }
  }, []);

  useEffect(() => {
    setLocalStorage("@whats-new:draft-news-form", form);
  }, [form]);

  return (
    <div>
      <h2 className="font-bold mb-10">Fill in all the fields on the form</h2>
      <form id="createNews" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            id="title"
            name="title"
            label="Title"
            value={form.title || ""}
            placeholder="News title..."
            handleChange={handleChange}
          />

          <SelectInput
            label="Category"
            name="category"
            value={form.category || ""}
            options={categories}
            handleChange={handleChange}
          />

          <div className="md:row-start-2 md:col-span-2">
            <Input
              id="description"
              name="description"
              label="Description"
              value={form.description || ""}
              placeholder="News description..."
              handleChange={handleChange}
            />
          </div>

          <div className="md:row-start-3 col-span-full flex flex-col gap-1">
            <span className="font-semibold">Content</span>
            <div className="border rounded-md border-tertiary/20 dark:border-slate-600 bg-white dark:bg-[#3c4856]">
              <Editor content={form.content} onChange={handleContent} />
            </div>
          </div>

          <div className="col-span-full flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() =>
                setForm({
                  title: "",
                  description: "",
                  category: "",
                  content: "",
                })
              }
              className="py-1 px-3 rounded-md font-semibold duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
            >
              Reset fields
            </button>
            <button
              type="submit"
              className="py-1 px-3 rounded-md bg-vibrant-red font-semibold text-white duration-100 hover:bg-vibrant-red/70"
            >
              Create news
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
